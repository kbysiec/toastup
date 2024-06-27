import { themes } from "prism-react-renderer";
import { CodeBlock as ReactCodeBlock } from "react-code-block/dist/code-block";
import { useCopyToClipboard } from "react-use";
import styles from "./CodeBlock.module.scss";

interface CodeBlockProps {
  code: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
}: CodeBlockProps) => {
  const [state, copyToClipboard] = useCopyToClipboard();

  const copyCode = () => {
    copyToClipboard(code);

    setTimeout(() => copyToClipboard(""), 2000);
  };

  return (
    <ReactCodeBlock code={code} language="tsx" theme={themes.oceanicNext}>
      <div className={styles.codeBlock}>
        <ReactCodeBlock.Code className="bg-gray-900 !p-6 rounded-xl shadow-lg">
          <div className={styles.row}>
            <ReactCodeBlock.LineNumber className={styles.lineNumber} />
            <ReactCodeBlock.LineContent className={styles.lineContent}>
              <ReactCodeBlock.Token />
            </ReactCodeBlock.LineContent>
          </div>
        </ReactCodeBlock.Code>

        <button className={styles.copyButton} onClick={copyCode}>
          {state.value ? "copied" : "copy"}
        </button>
      </div>
    </ReactCodeBlock>
  );
};
