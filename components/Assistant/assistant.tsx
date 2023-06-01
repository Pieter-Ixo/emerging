import React from "react";
import { Card, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { mobileBreakpoint, tabletBreakpoint } from "@/constants/breakpoints";

function Assistant() {
  const viewPortSize = useViewportSize();
  return (
    <div>
      <Card
        shadow="sm"
        p="lg"
        radius={16}
        withBorder
        style={{
          width: viewPortSize.width >= tabletBreakpoint ? 312 : 358,
          height: 452,
        }}
      >
        <Text style={{ fontSize: 16, marginBottom: 20 }}>Assistant</Text>
      </Card>
    </div>
  );
}

export default Assistant;
