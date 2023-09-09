import { Text, CopyButton } from "@mantine/core";

import { palette } from "@/theme/palette";
import shortStr from "@/utils/shortStr";
import BaseIcon from "@/components/Presentational/BaseIcon";
import Copy from "@/assets/icons/copy.svg";

export default function BatchIdentifier({
  name,
  batchId,
  isProgressComplete,
}: {
  name?: string;
  batchId?: string;
  isProgressComplete?: boolean;
}) {
  const indexTextColor = isProgressComplete
    ? palette.Black
    : palette.accentActive;

  return (
    <CopyButton value={`${name}/${batchId}`}>
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
          {`${name}/${shortStr(batchId, 25, 10)}`}
          <BaseIcon
            Icon={Copy}
            width="18"
            height="19"
            style={{ position: "absolute", top: "2px", marginLeft: "1em" }}
            theme={{
              notSelected: {
                fill: copied ? palette.accentLight : palette.accentActive,
              },
            }}
          />
        </Text>
      )}
    </CopyButton>
  );
}
