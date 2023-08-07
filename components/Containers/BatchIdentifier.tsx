import { Text, CopyButton } from "@mantine/core";

import { palette } from "@/theme/palette";
import Copy from "@/icons/copy";
import shortStr from "@/utils/shortStr";

export default function BatchIdentifier({
  name,
  index,
  isProgressComplete,
}: {
  name?: string;
  index?: string;
  isProgressComplete?: boolean;
}) {
  const indexTextColor = isProgressComplete ? palette.Black : palette.fullBlue;

  return (
    <CopyButton value={`${name}/${index}`}>
      {({ copied, copy }) => (
        <Text
          fw={600}
          color={indexTextColor}
          sx={{ fontSize: "13px", position: "relative", cursor: "pointer" }}
          align="center"
          onClick={(e) => {
            e.stopPropagation();
            copy();
          }}
        >
          {`${name}/${shortStr(index, 25, 10)}`}
          <Copy
            fill={copied ? palette.brightBlue : palette.fullBlue}
            style={{ position: "absolute", top: "2px", marginLeft: "1em" }}
          />
        </Text>
      )}
    </CopyButton>
  );
}
