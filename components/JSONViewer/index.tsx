import { memo } from "react";
import { Box } from "@mantine/core";

import { Obj } from "./types";
import JSONViewerChild from "./JSONViewerChild";

interface Props {
  json: string;
}

function JSONViewer({ json }: Props) {
  const obj = JSON.parse(json) as Obj;

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
      <JSONViewerChild obj={obj} />
    </Box>
  );
}

export default memo(JSONViewer);
