'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface RemoveStickerButtonProps {
  plateNumber: string;
  asin: string;
}

export function RemoveStickerButton({
  plateNumber,
  asin,
}: RemoveStickerButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const router = useRouter();

  const handleRemoveSticker = async () => {
    setIsLoading(true);
    try {
      // const response = await removeSticker(plateNumber, asin)
      // setResult(response)
      router.refresh();
    } catch (error) {
      setResult({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid mt-2">
      <Button
        onClick={handleRemoveSticker}
        disabled={isLoading}
        variant={"destructive"}
      >
        {isLoading ? "Removing..." : "Yes"}
      </Button>
      {result && (
        <p className={result.success ? "text-green-600" : "text-red-600"}>
          {result.message}
        </p>
      )}
    </div>
  );
}

