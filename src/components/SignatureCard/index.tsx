"use client";

import React, { useEffect, useRef } from "react";
import SignaturePad from "signature_pad";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

// Define the props type for the component
interface SignatureCardProps {
  fullName: string;
  value?: string | null; // Signature image URL or null
  onChange: (signature: string) => void; // Function to handle signature data
}

const SignatureCard: React.FC<SignatureCardProps> = ({
  fullName,
  value,
  onChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const signaturePad = useRef<SignaturePad | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      signaturePad.current = new SignaturePad(canvasRef.current);
    }
  }, []);

  const clearSignature = async () => {
    signaturePad.current?.clear();
  };

  const handleSaveSignature = async () => {
    if (!signaturePad.current) return;

    // Get signature data
    const signatureData = signaturePad.current.toDataURL();

    try {
      onChange(signatureData);
      toast({
        title: "Signature enregistrée",
        description: "La signature a été enregistrée avec succès",
      });
    } catch (error: any) {
      console.error("Error saving signature:", error);
      toast({
        title: "Erreur lors de l'enregistrement de la signature",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex w-full flex-col items-start space-y-6">
      <h3 className="text-secondary-color text-lg font-bold">{fullName}</h3>
      <div className="mx-auto rounded-xl bg-white">
        {value ? (
          <Image
            src={value}
            alt={fullName}
            width={300}
            height={500}
            className="h-[300px] w-full p-4"
          />
        ) : (
          <canvas
            ref={canvasRef}
            height={300}
            width={550}
            className="w-full rounded-md border-2 border-black/70"
          ></canvas>
        )}
      </div>

      {!value && (
        <div className="flex flex-row items-center space-x-2">
          <Button
            className="bg-secondary-color font-semibold text-black hover:bg-amber-500"
            onClick={handleSaveSignature}
          >
            Valider
          </Button>
          <Button
            onClick={clearSignature}
            className="bg-[#585858] font-semibold text-white hover:bg-[#585858]"
          >
            Réinitialiser
          </Button>
        </div>
      )}
    </div>
  );
};

export default SignatureCard;
