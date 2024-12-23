import React, { useRef, useState, useEffect } from "react";
import { SimpleFileUpload } from "../ui/file-upload";
import { useIsMobile } from "../hooks/use-mobile";
import { Send } from "lucide-react";

interface ChatInputProps {
  input: string;
  loading: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFileUpload: (files: File[]) => void;
}

export function ChatInput({ input, loading, onSubmit, onInputChange, onFileUpload }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textareadivRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState(0);
  const isMobile = useIsMobile();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    onSubmit(e);
    setIsFocused(false);
  };

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`;
      setTextareaHeight(scrollHeight);
      if (textareadivRef.current) {
        if (scrollHeight <= 52) {
          textareadivRef.current.style.height = "auto";
        }
        textareadivRef.current.style.height = `${scrollHeight}px`;
      }

      // if (isMobile) {
      //   if (!isFocused) {
      //     textareaRef.current.style.height = "auto";
      //   }
      // }

      textareaRef.current.style.overflowY = scrollHeight <= 52 ? "hidden" : "scroll";
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    }
    if (e.key === "Escape" && !e.shiftKey) {
      e.preventDefault();
      setIsFocused(false);
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [input, isFocused]);

  const commonTextareaClasses =
    "p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none";

  const desktopForm = (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 pt-2">
      <div className="relative flex items-end gap-4 mt-2 mx-6 mb-3 justify-center w-full max-w-[1200px] min-w-[300px] min-h-[44px]">
        <SimpleFileUpload onChange={onFileUpload} />
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => {
            onInputChange(e);
            adjustHeight();
          }}
          onFocus={() => {
            setIsFocused(true);
            adjustHeight();
          }}
          onKeyDown={handleKeyDown}
          onBlur={() => setIsFocused(false)}
          placeholder="Tapez votre message..."
          className={`flex-1 ${commonTextareaClasses} ${"max-h-[30vh]"}`}
          disabled={loading}
          rows={1}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-sm disabled:bg-blue-400"
        >
          {loading ? "Envoi..." : "Envoyer"}
        </button>
      </div>
    </form>
  );

  const mobileForm = (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 pt-2">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => {
          onInputChange(e);
          adjustHeight();
        }}
        onFocus={() => {
          setIsFocused(true);
          adjustHeight();
        }}
        onKeyDown={handleKeyDown}
        onBlur={() => setIsFocused(false)}
        placeholder="Tapez votre message..."
        className={`w-[90%] pb-2 max-h-[40vh] ${commonTextareaClasses}`}
        disabled={loading}
        rows={1}
      />
      <div className="relative flex items-center justify-between mb-3 w-full px-6">
        <SimpleFileUpload onChange={onFileUpload} />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white shadow-sm disabled:bg-blue-400 h-9 w-9 flex items-center justify-center rounded-full"
        >
          <Send size={16} />
        </button>
      </div>
    </form>
  );

  return !isMobile ? desktopForm : mobileForm;
}
