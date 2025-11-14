import { useState } from "react";
import "./App.css";
import {
  DocumentMagnifyingGlassIcon,
  VariableIcon,
} from "@heroicons/react/24/outline";
import CustomLatex from "./components/custom-latex";
import Modal from "react-modal";
import MathInput from "./components/math-input";
import Preview from "./components/preview";

Modal.setAppElement("#root");

function App() {
  const [isCustomLatex, setIsCustomLatex] = useState(false);
  const [showMathModal, setShowMathModal] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [inputContent, setInputContent] = useState("");

  const handleAddLatex = (latex: string) => {
    setInputContent((prevStatus) => prevStatus + latex);
    setShowMathModal(false);
  };

  const handleMathInputChange = () => {
    setIsCustomLatex((prevStatus) => !prevStatus);
  };

  return (
    <div className="bg-white px-5 py-6">
      <Modal
        isOpen={showMathModal}
        onRequestClose={() => {
          setShowMathModal(false);
        }}
        className="inset-0 w-[380px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 outline-none"
      >
        <div>
          <h1 className="text-white text-xl pb-3">数式を追加</h1>
          <div className="bg-white rounded-lg p-3">
            {isCustomLatex ? (
              <CustomLatex
                addLatex={handleAddLatex}
                mathInputChange={handleMathInputChange}
                plusText="数式を追加"
              />
            ) : (
              <MathInput
                addLatex={handleAddLatex}
                mathInputChange={handleMathInputChange}
                plusText="数式を追加"
              />
            )}
            <p className="text-gray-400 p-2">
              投稿後の表示はプレビュー画面で確認できます。
            </p>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={previewOpen}
        onRequestClose={() => {
          setPreviewOpen(false);
        }}
        className="inset-0"
      >
        <Preview inputContent={inputContent} />
      </Modal>
      <div className="rounded-lg">
        <div className="flex justify-end">
          <div className="flex gap-3">
            <VariableIcon
              onClick={() => {
                setShowMathModal(true);
              }}
              className="h-9 w-9 bg-sky-400 opacity-80 hover:opacity-60 text-white rounded-full p-2 cursor-pointer"
            />
            <DocumentMagnifyingGlassIcon
              onClick={() => {
                setPreviewOpen(true);
              }}
              className="h-9 w-9 bg-sky-400 opacity-80 hover:opacity-60 text-white rounded-full p-2 mr-2 cursor-pointer"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="content"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            内容
          </label>
          <textarea
            id="content"
            name="content"
            placeholder="内容を入力"
            className="h-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
            value={inputContent}
            onChange={(e) => {
              setInputContent(e.currentTarget.value);
            }}
          ></textarea>
          <p className="text-right text-gray-600 text-sm">
            {inputContent.length}文字
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
