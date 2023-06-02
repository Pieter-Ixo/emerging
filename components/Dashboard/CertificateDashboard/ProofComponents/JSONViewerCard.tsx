import React from "react";

interface Props {
  json: string;
}

const JSONViewerCard: React.FC<Props> = (props: Props) => {
  const json = JSON.stringify(JSON.parse(props.json), undefined, 2);

  return (
    <textarea
      value={json}
      readOnly
      style={{
        resize: "none",
        width: "100%",
        height: "500px",
        fontFamily: 'RobotoCondensed',
        fontSize: 12,
        lineHeight: "16px",
        letterSpacing: "0.1rem",
        background: "#EFEFEF",
        padding: 10,
        borderRadius: 8,
        border: "none",
      }}
    />
  );
};

export default JSONViewerCard;
