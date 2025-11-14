import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import ReactMarkdown from "react-markdown";
import "katex/dist/katex.min.css";
import { ArrowsRightLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface Props {
  addLatex: (latex: string) => void;
  mathInputChange: () => void;
  plusText?: string;
}

export default function CustomLatex(props: Props) {
  const [latex, setLatex] = useState("");

  const handleAddLatexClick = () => {
    if (latex === "" || latex === "$$") {
      return;
    }
    props.addLatex(`$${latex}$`);
    setLatex("");
  };

  return (
    <>
      <div className="flex justify-end">
        <button onClick={props.mathInputChange}>
          <ArrowsRightLeftIcon className="h-9 w-9 bg-sky-400 opacity-80 text-white rounded-full p-2 mr-2 hover:opacity-60" />
        </button>
        <button onClick={handleAddLatexClick}>
          <PlusIcon className="h-9 w-9 bg-sky-400 opacity-80 text-white rounded-full p-2 mr-2 hover:opacity-60" />
        </button>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="text-2xl my-3 w-full overflow-auto">
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {`$${latex}$`}
          </ReactMarkdown>
        </div>
        <input
          type="text"
          className="border-2 w-full h-10 p-2 rounded-lg outline-none"
          value={latex}
          placeholder="Tex形式で数式を入力"
          onChange={(e) => {
            setLatex(e.currentTarget.value);
          }}
        />
      </form>
    </>
  );
}
