import { greek, mathFormula, otherSymbols } from "../lib/symbol";
import { ArrowsRightLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
import { TabButton } from "./buttons";
import { useRef, useState } from "react";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import ReactMarkdown from "react-markdown";
import "katex/dist/katex.min.css";
import { addStyles, EditableMathField } from "react-mathquill";

interface Props {
  addLatex: (latex: string) => void;
  mathInputChange: () => void;
  plusText?: string;
}

interface MathField {
  cmd: (text: string) => void;
}

addStyles();

export default function MathInput(props: Props) {
  const [tabItems, setTabItems] = useState(mathFormula);
  const [latex, setLatex] = useState("");
  const mathfield = useRef<MathField | null>(null);

  const insertText = (text: string) => {
    mathfield.current?.cmd(text);
  };

  const handleAddLatexClick = () => {
    if (latex === "" || latex === "$$") {
      return;
    }
    props.addLatex(`$${latex}$`);
    setLatex("");
  };

  const btnItems = tabItems.map((symbol, index: number) => {
    return (
      <button
        key={index}
        onClick={() => {
          insertText(symbol.tex);
        }}
        className="rounded-lg bg-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-300 py-2 px-3"
      >
        <div className="text-base">
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {symbol.name}
          </ReactMarkdown>
        </div>
      </button>
    );
  });

  return (
    <>
      <div className="flex justify-end mb-2">
        <button onClick={props.mathInputChange}>
          <ArrowsRightLeftIcon className="h-9 w-9 bg-sky-400 opacity-80 text-white rounded-full p-2 mr-2 hover:opacity-60" />
        </button>
        <button onClick={handleAddLatexClick}>
          <PlusIcon className="h-9 w-9 bg-sky-400 opacity-80 text-white rounded-full p-2 mr-2 hover:opacity-60" />
        </button>
      </div>
      <div className="min-h-16">
        <EditableMathField
          latex={latex}
          mathquillDidMount={(mf) => {
            mathfield.current = mf;
          }}
          onChange={(mathField) => {
            setLatex(mathField.latex());
          }}
          className="w-full min-h-16 p-2 rounded-sm"
        />
      </div>
      <nav className="flex flex-row pb-2">
        <TabButton
          isActive={tabItems === mathFormula}
          onClick={() => {
            setTabItems(mathFormula);
          }}
        >
          数式
        </TabButton>
        <TabButton
          isActive={tabItems === otherSymbols}
          onClick={() => {
            setTabItems(otherSymbols);
          }}
        >
          記号
        </TabButton>
        <TabButton
          isActive={tabItems === greek}
          onClick={() => {
            setTabItems(greek);
          }}
        >
          ギリシャ文字
        </TabButton>
      </nav>
      <div className="h-72 px-1">
        <div className="flex flex-wrap gap-x-3 gap-y-2 justify-start items-start">
          {btnItems}
        </div>
      </div>
    </>
  );
}
