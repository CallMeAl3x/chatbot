import { SimpleFileUpload } from "../ui/file-upload";

interface ChatInputProps {
  input: string;
  loading: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileUpload: (files: File[]) => void;
}

export function ChatInput({ input, loading, onSubmit, onInputChange, onFileUpload }: ChatInputProps) {
  return (
    <form onSubmit={onSubmit} className="flex items-center gap-4 mt-2 mx-6 mb-3">
      <SimpleFileUpload onChange={onFileUpload} />
      <input
        type="text"
        value={input}
        onChange={onInputChange}
        placeholder="Tapez votre message..."
        className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-sm disabled:bg-blue-400"
      >
        {loading ? "Envoi..." : "Envoyer"}
      </button>
    </form>
  );
}
