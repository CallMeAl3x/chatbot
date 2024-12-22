"use client";

import { ChatInput } from "@/app/components/chat/ChatInput";
import { MessageList } from "@/app/components/chat/MessageList";
import { FileDropzone } from "@/app/components/ui/file-dropzone";
import { UploadedFileItem } from "@/app/components/ui/uploaded-file-item";
import { formatFileSize } from "@/lib/chat/format-files-utils";
import { extractPDFText } from "@/lib/chat/pdf-utils";
import { chatService } from "@/lib/services/chat-service";
import { Message } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Props {
  params: {
    pageId: string;
  };
}

interface ExtendedMessage extends Message {
  status: "pending" | "sent" | "error";
}

export default function DynamicChatPage({ params }: Props) {
  const { data: session } = useSession();
  const [pendingMessage, setPendingMessage] = useState<Message | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileUpload = (files: File[]) => {
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleRemoveFile = (fileToRemove: File) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
  };

  useEffect(() => {
    async function loadMessages() {
      if (session?.user) {
        try {
          const existingMessages = await chatService.getMessages(params.pageId);
          setMessages(existingMessages);
        } catch (error) {
          console.error("Error loading messages:", error);
        }
      }
    }

    loadMessages();
  }, [session, params.pageId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() && uploadedFiles.length === 0) return;

    setLoading(true);
    try {
      // Créer un message temporaire
      const tempMessage: ExtendedMessage = {
        id: Date.now().toString(),
        content: input,
        sender: "user",
        status: "pending",
        createdAt: new Date(),
        userId: session?.user?.id || "",
        pageId: params.pageId,
        fileContent: "",
        fileName: null,
        fileSize: null,
        fileType: null
      };

      // Ajouter le message temporaire à la liste
      setMessages((prev) => [...prev, tempMessage]);
      setPendingMessage(tempMessage);

      let fileContent = "";
      let fileMetadata: { name: string; size: number; type: string } | undefined = undefined;

      if (uploadedFiles.length > 0) {
        const file = uploadedFiles[0];
        fileContent = await extractPDFText(file);
        fileMetadata = {
          name: file.name,
          size: file.size,
          type: file.type
        };
      }

      // Envoyer le message au serveur
      await chatService.sendMessage(input, fileContent, params.pageId, fileMetadata);

      // Mettre à jour le statut du message
      setMessages((prev) => prev.map((msg) => (msg.id === tempMessage.id ? { ...msg, status: "sent" } : msg)));
      setPendingMessage(null);

      // Récupérer les messages mis à jour
      const updatedMessages = await chatService.getMessages(params.pageId);
      setMessages(updatedMessages);
      setUploadedFiles([]);
    } catch (error) {
      console.error(error);
      // Gérer l'erreur et mettre à jour le statut du message
      setMessages((prev) => prev.map((msg) => (msg.id === pendingMessage?.id ? { ...msg, status: "error" } : msg)));
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  return (
    <div className="h-screen">
      <FileDropzone onDrop={handleFileUpload} className="h-full">
        <div className="flex flex-col h-full relative">
          <div className="flex-1 overflow-y-auto relative">
            <div className="p-3 mx-8 max-h-[calc(100vh-200px)]">
              <MessageList messages={messages as ExtendedMessage[]} />{" "}
            </div>
          </div>

          {uploadedFiles.length > 0 && (
            <ul className="mx-6 mb-1.5">
              {uploadedFiles.map((file, index) => (
                <UploadedFileItem key={index} file={file} fileSize={formatFileSize(file.size)} onRemove={handleRemoveFile} />
              ))}
            </ul>
          )}
          <ChatInput
            input={input}
            loading={loading}
            onSubmit={handleSubmit}
            onInputChange={handleInputChange}
            onFileUpload={handleFileUpload}
          />
        </div>
      </FileDropzone>
    </div>
  );
}
