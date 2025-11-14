import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import ReactMarkdown from "react-markdown";
import "katex/dist/katex.min.css";

interface Props {
  inputContent: string;
}

export default function Preview({ inputContent }: Props) {
  return (
    <div className="w-[380px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 outline-none">
      <h1 className="text-xl pb-3">プレビュー</h1>
      <div className="bg-white border rounded-lg p-3 min-h-10 max-h-[600px] overflow-y-auto">
        <div className="text-base break-words whitespace-pre-wrap">
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {inputContent}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
