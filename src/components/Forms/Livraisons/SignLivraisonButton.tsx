import SignatureCard from "@/components/SignatureCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { AuthStore } from "@/store/authStore";
import { Check } from "lucide-react";
import { useState } from "react";
import { mutate } from "swr";

interface SignLivraisonButtonProps {
  client: any;
  livraison: any;
}

export function SignLivraisonButton({
  client,
  livraison,
}: SignLivraisonButtonProps) {
  const [open, setOpen] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  const { user } = AuthStore.useState();
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!signature) {
      toast({
        title: "Signature manquante",
        description: "Veuillez fournir une signature avant de continuer",
        variant: "destructive",
      });
      return;
    }

    const fileKey = crypto.randomUUID();

    try {
      setLoading(true);
      // 1. Get presigned URL from backend
      const presignedResponse = await fetch("/api/v1/medias/presigned-urls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          files: [
            {
              name: "signature.png",
              type: "image/png",
              key: fileKey,
            },
          ],
        }),
      });

      if (!presignedResponse.ok) throw new Error("Failed to get presigned URL");

      const { urls } = await presignedResponse.json();
      const { uploadUrl, publicUrl } = urls[0];

      // 2. Convert base64 to Blob
      const base64Data = signature.split(",")[1];
      const byteCharacters = atob(base64Data);
      const byteArrays = new Uint8Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays[i] = byteCharacters.charCodeAt(i);
      }

      const blob = new Blob([byteArrays], { type: "image/png" });

      // 3. Upload to S3
      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        body: blob,
        headers: {
          "Content-Type": "image/png",
        },
      });

      if (!uploadResponse.ok) throw new Error("Upload failed");

      const response = await fetch(`/api/v1/livraisons/delivered`, {
        method: "PATCH",
        body: JSON.stringify({
          orderId: livraison.orderId,
          signature: publicUrl,
          livraisonId: livraison.id,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
      });

      console.log("Livraison Delivered: ", response);

      toast({
        title: "Succès",
        description: "Livraison terminée avec succès",
      });

      setOpen(false);
      setSignature(null);
      mutate(`/api/v1/livraisons/${livraison.id}`);
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Erreur",
        description: "Échec de l'enregistrement de la signature",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="secondary"
          className="basis-2/5 bg-meta-3 text-whiten"
        >
          <Check className="mr-2 h-5 w-5" />
          Terminer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Signer la livraison</DialogTitle>
          <DialogDescription>
            Utilisez ce formulaire pour signer la livraison
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <SignatureCard
            onChange={setSignature}
            fullName={client.fullName}
            value={signature}
          />
        </div>
        <DialogFooter>
          <Button className="bg-white" onClick={() => setOpen(false)}>
            Annuler
          </Button>
          <Button
            onClick={onSubmit}
            disabled={loading}
            className={cn("w-full bg-meta-3")}
          >
            {loading ? "Enregistrement en cours..." : "Enregistrer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
