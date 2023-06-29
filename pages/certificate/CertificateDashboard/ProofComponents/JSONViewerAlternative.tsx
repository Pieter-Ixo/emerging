import { CodeBlock } from "react-code-blocks";

// use the component in your app!
interface Props {
  json: string;
}

export default function JSONViewerAlternative({ json }: Props) {
  if (!json) return null;

  return (
    <div
      style={{
        resize: "none",
        width: "100%",
        borderRadius: 8,
        border: "none",
        display: "block",
        flexWrap: "nowrap",
        overflow: "hidden",
      }}
    >
      <CodeBlock
        text={JSON.stringify(JSON.parse(json), null, 2)}
        language="json"
        showLineNumbers={false}
      />
    </div>
  );
}
