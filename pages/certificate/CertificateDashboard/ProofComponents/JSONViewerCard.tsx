import { palette } from "@/theme/palette";
import isURL from "@/utils/isStrUrl";
import shortStr from "@/utils/shortStr";
import { Box, Popover, Text, Flex, Anchor, TextProps } from "@mantine/core";
import { PropsWithChildren, memo } from "react";

const MAX_VALUE_LENGTH = 25;

function isLong(str: string): boolean {
  return str.length >= MAX_VALUE_LENGTH;
}

interface Props {
  json: string;
  depth?: number;
}

function Dots({ i }: { i: number }) {
  return (
    <span
      style={{
        whiteSpace: "nowrap",
        marginRight: "4px",
        opacity: "0.1",
      }}
    >
      {"● ".repeat(i || 0)}
    </span>
  );
}
function DotRowFlex({ children }: PropsWithChildren) {
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
function RowFlexText({ children }: PropsWithChildren) {
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
function TextField({ children, ...props }: PropsWithChildren & TextProps) {
  return (
    <Text
      color={palette.darkestBlue}
      ff="Roboto Condensed"
      size="13px"
      lh="200%"
      lts="1.3px"
      {...props}
    >
      {children}
    </Text>
  );
}

// TODO: THIS ELEMENT LEFT UNFINISHED. somehow I did not manage to make it work properly. Will finish it later.
function PopoverElement({
  text,
  children,
}: { text: string } & PropsWithChildren) {
  return (
    <Popover withArrow shadow="md">
      <Popover.Target>
        <TextField>{text}</TextField>
      </Popover.Target>
      <Popover.Dropdown sx={{ position: "initial", left: 0 }}>
        <TextField sx={{ overflowX: "scroll", scrollbarWidth: "none" }}>
          {children}
        </TextField>
      </Popover.Dropdown>
    </Popover>
  );
}

function JSONViewerCard({ json, depth = 0 }: Props) {
  const obj = JSON.parse(json) as Record<
    string,
    string | number | object | null
  >;

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
      ff="RobotoCondensed"
    >
      <Flex direction="column">
        {Object.entries(obj).map(([key, value]) => {
          if (typeof value === "object") {
            return (
              <Box key={`key-header-${key}`}>
                <DotRowFlex>
                  <Dots i={depth} />
                  <RowFlexText>
                    <TextField pr="lg">{key} </TextField>
                    <TextField> </TextField>
                  </RowFlexText>
                </DotRowFlex>
                <JSONViewerCard
                  key={key}
                  json={JSON.stringify(value)}
                  depth={depth + 1}
                />
              </Box>
            );
          }
          if (typeof value === "string") {
            if (isLong(value)) {
              return (
                <DotRowFlex key={`row-${key}`}>
                  <Dots i={depth} />
                  <RowFlexText>
                    <TextField pr="lg">{key} </TextField>
                    {/* <PopoverElement
                      text={shortStr(value, MAX_VALUE_LENGTH, 0) || ""}
                    > */}
                    {isURL(value) ? (
                      <Anchor
                        style={{ whiteSpace: "nowrap" }}
                        href={value}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <TextField>
                          {shortStr(value, MAX_VALUE_LENGTH, 0) || ""}
                        </TextField>
                      </Anchor>
                    ) : (
                      <TextField>
                        {shortStr(value, MAX_VALUE_LENGTH, 0) || ""}
                      </TextField>
                    )}
                    {/* </PopoverElement> */}
                  </RowFlexText>
                </DotRowFlex>
              );
            }
          }
          // not Long not URL or number
          return (
            <DotRowFlex key={`row-${key}`}>
              <Dots i={depth} />
              <RowFlexText>
                <TextField pr="lg">{key} </TextField>
                <TextField>{value}</TextField>
              </RowFlexText>
            </DotRowFlex>
          );
        })}
      </Flex>
    </Box>
  );
}

export default memo(JSONViewerCard);
