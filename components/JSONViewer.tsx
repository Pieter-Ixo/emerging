import { CSSProperties, PropsWithChildren, memo } from "react";
import { Box, Text, Flex, TextProps } from "@mantine/core";

import { palette } from "@/theme/palette";

interface Props {
  json: string;
  depth?: number;
}

function Dots({ i }: { i: number }) {
  return (
    <span
      style={{
        width: `calc(2em * ${i || 0})`,
        whiteSpace: "nowrap",
        marginRight: "4px",
      }}
    />
  );
}
function RowLine({ children }: PropsWithChildren) {
  return (
    <Flex
      direction="row"
      justify="left"
      align="center"
      wrap="nowrap"
      my="4px"
      sx={{ overflow: "hidden" }}
    >
      {children}
    </Flex>
  );
}
function RowText({ children }: PropsWithChildren) {
  return (
    <Flex
      direction="row"
      justify="space-between"
      align="center"
      wrap="nowrap"
      sx={{ width: "100%" }}
    >
      {children}
    </Flex>
  );
}
function Txt({ children, ...props }: PropsWithChildren & TextProps) {
  const style: CSSProperties = { ...props.style, whiteSpace: "nowrap" };
  return (
    <Text
      color={palette.darkestBlue}
      ff="RobotoCondensed"
      size="13px"
      lh="200%"
      lts="1.3px"
      style={style}
      {...props}
    >
      {children}
    </Text>
  );
}

function JSONViewer({ json, depth = 0 }: Props) {
  const obj = JSON.parse(json) as Record<string, string | object | null>;

  return (
    <Box
      sx={{
        resize: "none",
        width: "100%",
        borderRadius: 8,
        border: "none",
        display: "block",
        flexWrap: "nowrap",
      }}
    >
      <Flex direction="column">
        {Object.entries(obj).map(([key, value]) => {
          if (typeof value === "object") {
            return (
              <Box key={`key-header-${key}`}>
                <RowLine>
                  <Dots i={depth} />
                  <RowText>
                    <Txt pr="lg">{key} </Txt>
                    <Txt> </Txt>
                  </RowText>
                </RowLine>
                <JSONViewer
                  key={key}
                  json={JSON.stringify(value)}
                  depth={depth + 1}
                />
              </Box>
            );
          }
          return (
            <RowLine key={`row-${key}`}>
              <Dots i={depth} />
              <RowText>
                <Txt pr="lg">{key} </Txt>
                <Txt>{value}</Txt>
              </RowText>
            </RowLine>
          );
        })}
      </Flex>
    </Box>
  );
}

export default memo(JSONViewer);
