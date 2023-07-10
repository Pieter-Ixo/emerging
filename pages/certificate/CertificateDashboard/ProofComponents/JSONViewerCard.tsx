import isURL from "@/utils/isStrUrl";
import shortStr from "@/utils/shortStr";
import { Popover, Text } from "@mantine/core";
import { CSSProperties, PropsWithChildren, memo } from "react";

const MAX_VALUE_LENGTH = 24;

function isLong(str: string): boolean {
  return str.length >= MAX_VALUE_LENGTH;
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
  const obj = JSON.parse(json) as Record<
    string,
    string | number | object | null
  >;

  return (
    <div style={StylesWrapper}>
      <div style={StylesColumn}>
        {Object.entries(obj).map(([key, value]) => {
          if (typeof value === "object") {
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
          if (typeof value === "string") {
            if (isLong(value)) {
              return (
                <div key={`row-${key}`} style={StylesRowDotContent}>
                  <span style={StylesDotSpan}>{"● ".repeat(depth || 0)}</span>
                  <div style={StylesRowKeyValue}>
                    <div style={StylesPaddingRight}>{key} </div>
                    <PopoverElement
                      text={shortStr(value, MAX_VALUE_LENGTH, 0) || ""}
                    >
                      {isURL(value) ? (
                        <a
                          style={StylesNoWrap}
                          href={value}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {value}
                        </a>
                      ) : (
                        <div>{value}</div>
                      )}
                    </PopoverElement>
                  </div>
                </div>
              );
            }
          }
          // not Long not URL or number
          return (
            <div key={`row-${key}`} style={StylesRowDotContent}>
              <span style={StylesDotSpan}>{"● ".repeat(depth || 0)}</span>
              <div style={StylesRowKeyValue}>
                <div style={StylesPaddingRight}>{key} </div>
                <div>{value}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(JSONViewerCard);
