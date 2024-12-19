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
import { Check } from "lucide-react";
import { useState } from "react";

interface SignLivraisonButtonProps {
  client: any;
}

export function SignLivraisonButton({ client }: SignLivraisonButtonProps) {
  const [open, setOpen] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);

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
      </DialogContent>
    </Dialog>
  );
}
