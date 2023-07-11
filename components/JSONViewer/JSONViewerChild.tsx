import { PropsWithChildren, useState } from "react";
import { Text, Flex, TextProps, Button } from "@mantine/core";

import { palette } from "@/theme/palette";
import { Obj } from "./types";

interface Props {
  obj: Obj;
  depth?: number;
}

function Row({ children }: PropsWithChildren) {
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
  return (
    <Text
      color={palette.darkestBlue}
      ff="RobotoCondensed"
      size="13px"
      //   lh="200%"
      lts="1.3px"
      style={{
        ...props.style,
        whiteSpace: "nowrap",
        alignContent: "left",
      }}
      {...props}
    >
      {children}
    </Text>
  );
}
function RowWithText({
  children,
  label,
}: PropsWithChildren & { label: string }) {
  return (
    <Row>
      <Txt pr="lg">{label} </Txt>
      <Txt>{children}</Txt>
    </Row>
  );
}
function RowWithObj({
  obj,
  label,
  depth,
}: {
  obj: Obj;
  label: string;
  depth: number;
}) {
  const [isFolded, setIsUnfolded] = useState<boolean>(true);
  return (
    <>
      <Row>
        <Txt pr="lg">
          <Button variant="subtle" onClick={() => setIsUnfolded(!isFolded)}>
            {isFolded ? "▽" : "△"}
          </Button>
          {label}{" "}
        </Txt>
        <Txt />
      </Row>
      {isFolded ? null : <JSONViewerChild obj={obj} depth={depth} />}
    </>
  );
}

export default function JSONViewerChild({ obj, depth = 0 }: Props) {
  return (
    <Flex direction="column" ml="sm">
      {Object.entries(obj).map(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          return (
            <RowWithObj
              obj={value as Obj}
              key={`row-${key}`}
              label={key}
              depth={depth + 1}
            />
          );
        }
        return (
          <RowWithText key={`row-${key}`} label={key}>
            {value}
          </RowWithText>
        );
      })}
    </Flex>
  );
}
