import { Popover, Text } from "@mantine/core";
import React, { CSSProperties, PropsWithChildren, ReactElement } from "react";

function isLong(str: string): boolean {
  return str.length >= 40;
}
function isURL(str): boolean {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return pattern.test(str);
}

function PopoverElement({
  text,
  children,
}: { text: string } & PropsWithChildren) {
  return (
    <Popover width={200} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Text>{text}</Text>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="sm">{children}</Text>
      </Popover.Dropdown>
    </Popover>
  );
}

interface Props {
  json: string;
  depth?: number;
}

const StylesPaddingRight: CSSProperties = { paddingRight: "2em" };
const StylesNoWrap: CSSProperties = { whiteSpace: "nowrap" };
const StylesRowKeyValue: CSSProperties = {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignContent: "center",
  flexWrap: "nowrap",
  whiteSpace: "nowrap",
};
const StylesDotSpan: CSSProperties = {
  whiteSpace: "nowrap",
  marginRight: "4px",
  opacity: "0.1",
};
const StylesRowDotContent: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "left",
  alignContent: "center",
  fontFamily: "RobotoCondensed",
  fontSize: 12,
  lineHeight: "16px",
  letterSpacing: "0.1rem",
  margin: "4px 0",
  flexWrap: "nowrap",
  overflow: "hidden",
};
const StylesColumn: CSSProperties = {
  display: "flex",
  flexDirection: "column",
};
const StylesWrapper: CSSProperties = {
  resize: "none",
  width: "100%",
  borderRadius: 8,
  border: "none",
  display: "block",
  flexWrap: "nowrap",
};

function JSONViewerCard({ json, depth = 0 }: Props) {
  console.log({ depth });

  const obj = JSON.parse(json);

  return (
    <div style={StylesWrapper}>
      <div style={StylesColumn}>
        {Object.entries(obj).map(([key, value]) => {
          if (typeof value === "object") {
            console.log("object", key);

            return (
              <div key={`key-header-${key}`}>
                <div style={StylesRowDotContent}>
                  <span style={StylesDotSpan}>{"● ".repeat(depth)}</span>
                  <div style={StylesRowKeyValue}>
                    <div>{key} </div>
                    <div> </div>
                  </div>
                </div>
                <JSONViewerCard
                  key={key}
                  json={JSON.stringify(value)}
                  depth={depth + 1}
                />
              </div>
            );
          }
          if (typeof value === "number") {
            console.log("number", key, value);

            return (
              <div key={`row-${key}`} style={StylesRowDotContent}>
                <span style={StylesDotSpan}>{"● ".repeat(depth || 0)}</span>
                <div style={StylesRowKeyValue}>
                  <div style={StylesPaddingRight}>{key} </div>
                  <div>{value}</div>
                </div>
              </div>
            );
          }
          if (typeof value === "string") {
            if (isLong(value)) {
              if (isURL(value)) {
                console.log("Long & URL", key, value);
                // Long & URL
                return (
                  <div key={`row-${key}`} style={StylesRowDotContent}>
                    <span style={StylesDotSpan}>{"● ".repeat(depth || 0)}</span>
                    <div style={StylesRowKeyValue}>
                      <div style={StylesPaddingRight}>{key} </div>
                      <PopoverElement text={`${value.slice(0, 40)}...`}>
                        <a
                          style={StylesNoWrap}
                          href={value}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {value}
                        </a>
                      </PopoverElement>
                    </div>
                  </div>
                );
              }
              console.log("Long & not URL", key, value);
              // Long & not URL
              return (
                <div key={`row-${key}`} style={StylesRowDotContent}>
                  <span style={StylesDotSpan}>{"● ".repeat(depth || 0)}</span>
                  <div style={StylesRowKeyValue}>
                    <div style={StylesPaddingRight}>{key} </div>
                    <PopoverElement text={`${value.slice(0, 40)}...`}>
                      <div>{value}</div>
                    </PopoverElement>
                  </div>
                </div>
              );
            }
            console.log("not Long not URL", key, value);
            // not Long not URL
            return (
              <div key={`row-${key}`} style={StylesRowDotContent}>
                <span style={StylesDotSpan}>{"● ".repeat(depth || 0)}</span>
                <div style={StylesRowKeyValue}>
                  <div style={StylesPaddingRight}>{key} </div>
                  <div>{value}</div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default React.memo(JSONViewerCard);
