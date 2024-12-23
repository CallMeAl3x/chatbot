import ReactMarkdown, { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "./CodeBlock";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const components: Components = {
    code: CodeBlock
  };

  return (
    <div className="contentWrapper relative mt-1 lg:mt-0">
      <ReactMarkdown
        className="prose prose-blue max-w-none prose-pre:mt-1 inline break-all text-balance"
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
