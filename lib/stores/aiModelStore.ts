import { create } from "zustand";
import { persist } from "zustand/middleware";

type AIModel = "claude" | "gpt";

interface AIModelState {
  model: AIModel;
  setModel: (model: AIModel) => void;
}

export const useAIModelStore = create<AIModelState>()(
  persist(
    (set) => ({
      model: "claude",
      setModel: (model) => set({ model })
    }),
    {
      name: "ai-model-storage"
    }
  )
);
