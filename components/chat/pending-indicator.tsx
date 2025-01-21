import { Loader2 } from "lucide-react";

export function PendingIndicator() {
  return (
    <div className="mt-2 flex items-center justify-end text-xs text-gray-600">
      <Loader2 className="w-4 h-4 mr-1 animate-spin" />
      <span>Envoi en cours...</span>
    </div>
  );
}
