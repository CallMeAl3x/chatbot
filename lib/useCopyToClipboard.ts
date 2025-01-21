"use client";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export function useCopyToClipboard() {
  const [isCopied, setIsCopied] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const copyToClipboard = useCallback(
    async (textToCopy: string) => {
      if (isDisabled) return;

      if (!textToCopy) {
        toast.error("Rien à copier!");
        return;
      }

      try {
        await navigator.clipboard.writeText(textToCopy);
        setIsCopied(true);
        setIsDisabled(true);
        toast.success("Copier dans le presse-papier !");

        setTimeout(() => {
          setIsCopied(false);
          setIsDisabled(false);
        }, 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
        toast.error("Impossible de copier !");
      }
    },
    [isDisabled]
  );

  return { copyToClipboard, isCopied, isDisabled };
}
