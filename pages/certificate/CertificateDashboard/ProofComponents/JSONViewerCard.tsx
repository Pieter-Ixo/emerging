import { Popover, Text } from "@mantine/core";

function isURL(str) {
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

interface Props {
  json: string;
  depth?: number;
}

export default function JSONViewerCard({ json, depth }: Props) {
  const obj = JSON.parse(json);

  return (
    <div
      style={{
        resize: "none",
        width: "100%",
        borderRadius: 8,
        border: "none",
        display: "block",
        flexWrap: "nowrap",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {Object.entries(obj).map(([key, value]) => {
          if (typeof value === "object") {
            return (
              <div key={`key-header-${key}`}>
                <div
                  style={{
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
                  }}
                >
                  <span
                    style={{
                      whiteSpace: "nowrap",
                      marginRight: "4px",
                      opacity: "0.1",
                    }}
                  >
                    {"● ".repeat(depth || 0)}
                  </span>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignContent: "center",
                      flexWrap: "nowrap",
                    }}
                  >
                    <div>{key} </div>
                    <div> </div>
                  </div>
                </div>
                <JSONViewerCard
                  key={key}
                  json={JSON.stringify(value)}
                  depth={depth ? depth + 1 : 1}
                />
              </div>
            );
          }
          const v1 = String(value);
          let v2;

          if (v1.length >= 40) {
            v2 = (
              <Popover width={200} position="bottom" withArrow shadow="md">
                <Popover.Target>
                  {isURL(v1) ? (
                    <a style={{ whiteSpace: "nowrap" }} href={v1}>
                      {v1.slice(0, 40)}...
                    </a>
                  ) : (
                    <div style={{ whiteSpace: "nowrap" }}>
                      {v1.slice(0, 40)}...
                    </div>
                  )}
                </Popover.Target>
                <Popover.Dropdown>
                  <Text size="sm">{v1}</Text>
                </Popover.Dropdown>
              </Popover>
            );
          }
          return (
            <div
              key={`row-${key}`}
              style={{
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
              }}
            >
              <span
                style={{
                  whiteSpace: "nowrap",
                  marginRight: "4px",
                  opacity: "0.1",
                }}
              >
                {"● ".repeat(depth || 0)}
              </span>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignContent: "center",
                  flexWrap: "nowrap",
                }}
              >
                <div style={{ paddingRight: "2em" }}>{key} </div>
                {isURL(v1) ? (
                  <a style={{ whiteSpace: "nowrap" }} href={v1}>
                    {v1.slice(0, 40)}...
                  </a>
                ) : (
                  <div>{v2 ?? v1}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
