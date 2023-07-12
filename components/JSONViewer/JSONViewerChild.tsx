import { PropsWithChildren, useState } from "react";
import { Flex, Button, Anchor } from "@mantine/core";

import { isHttpUrl } from "@/utils/isStrUrl";

import { Obj } from "./types";
import Txt from "./Txt";
import Dropdown from "./Dropdown.svg";

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
function RowWithText({ value, label }: { label: string; value: string }) {
  if (isHttpUrl(value))
    return (
      <Row>
        <Txt pr="lg">{label} </Txt>
        <Anchor href={value} target="_blank" rel="noreferrer">
          <Txt color="unset">{value}</Txt>
        </Anchor>
      </Row>
    );
  return (
    <Row>
      <Txt pr="lg">{label} </Txt>
      <Txt>{value}</Txt>
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
        <Flex align="center">
          <Button
            variant="subtle"
            onClick={() => setIsUnfolded(!isFolded)}
            px="0"
            w="1.5em"
            h="1em"
          >
            {isFolded ? <Dropdown /> : <Dropdown style={{transform: 'rotate(180deg)'}} />}
          </Button>
          <Txt pr="lg">{label}</Txt>
        </Flex>
        <Txt />
      </Row>
      {!isFolded && <JSONViewerChild obj={obj} depth={depth} />}
    </>
  );
}

export default function JSONViewerChild({ obj, depth = 0 }: Props) {
  return (
    <Flex direction="column" ml={depth === 0 ? "0" : "1.5em"}>
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
          <RowWithText key={`row-${key}`} label={key} value={value ?? ""} />
        );
      })}
    </Flex>
  );
}
