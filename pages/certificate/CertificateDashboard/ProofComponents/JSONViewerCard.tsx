import React from "react";

interface Props {
  json: string;
}

export function JSONViewerCard(props: Props) {
  const json = JSON.stringify(JSON.parse(props.json), undefined, 2);

  return (
    <textarea
      value={json}
      readOnly
      style={{
        resize: "none",
        width: "100%",
        height: "500px",
        fontFamily: "RobotoCondensed",
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
}

export function JSONViewerCardPretty({ json }: Props) {
  const obj = JSON.parse(json);

  return (
    <div
      style={{
        resize: "none",
        width: "100%",
        fontFamily: "RobotoCondensed",
        fontSize: 12,
        lineHeight: "16px",
        letterSpacing: "0.1rem",
        padding: 10,
        borderRadius: 8,
        border: "none",
        display: "block",
      }}
    >
      <div
        style={{
          // display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
        }}
      >
        THIS COMPONENT IS IN PROGRESS, DO NOT LOOK HERE YET
        {Object.entries(obj).map(([key, value]) => {
          if (typeof value === "object") {
            return (
              <></>
              // <JSONViewerCardPretty key={key} json={JSON.stringify(value)} />
            );
          }
          return (
            <div key={key}>
              {/* <div>🔺{key} ➖ </div>
              <div>{String(value)}🔻</div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
