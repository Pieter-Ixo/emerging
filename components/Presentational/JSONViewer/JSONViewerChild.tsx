import { PropsWithChildren, useState } from "react";
import { Flex, Button, Anchor, Tooltip } from "@mantine/core";
import Link from "next/link";

import { isHttpUrl } from "@/utils/isStrUrl";

import { Obj } from "./types";
import Txt from "./Txt";
import Dropdown from "./Dropdown.svg";
import shortStr from "../../../utils/shortStr";

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
function RowWithText({ value, label }: { label?: string; value: string }) {
  if (isHttpUrl(value))
    return (
      <Row>
        {label && <Txt pr="lg">{label}</Txt>}
        <Link href={value} target="_blank" rel="noreferrer">
          <Anchor>
            {value.length > 20 ? (
              <Tooltip label={value}>
                <Txt color="unset">{shortStr(String(value), 23, 0)}</Txt>
              </Tooltip>
            ) : (
              <Txt>{}</Txt>
            )}
          </Anchor>
        </Link>
      </Row>
    );
  return (
    <Row>
      {label && <Txt pr="lg">{label}</Txt>}
      {value.length > 20 ? (
        <Tooltip inline label={value}>
          <Txt>{shortStr(String(value), 23, 0)}</Txt>
        </Tooltip>
      ) : (
        <Txt>{value}</Txt>
      )}
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
  const [isFolded, setIsFolded] = useState<boolean>(true);

  return (
    <>
      <Row>
        <Flex align="center">
          <Button
            variant="subtle"
            onClick={() => setIsFolded(!isFolded)}
            px="0"
            w="1.5em"
            h="1em"
          >
            {isFolded ? (
              <Dropdown />
            ) : (
              <Dropdown style={{ transform: "rotate(180deg)" }} />
            )}
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
        if (Array.isArray(obj)) {
          return <RowWithText key={`row-${key}`} value={value ?? ""} />;
        }
        return (
          <RowWithText key={`row-${key}`} label={key} value={value ?? ""} />
        );
      })}
    </Flex>
  );
}
