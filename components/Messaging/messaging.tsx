import React, { useState } from "react";
import { Card, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { mobileBreakpoint, tabletBreakpoint } from "@/constants/breakpoints";
import MessagePreview from "./message-preview";
import Chat from "./chat";

function Messaging() {
  const viewPortSize = useViewportSize();
  const [chat, setChat] = useState(false);
  return (
    <div>
      <Card
        shadow="sm"
        p="lg"
        radius={16}
        withBorder
        style={{
          width: viewPortSize.width >= tabletBreakpoint ? 312 : 358,
          height: viewPortSize.height * 0.7,
        }}
      >
        {chat ? (
          <>
            <Chat />
          </>
        ) : (
          <>
            <Text style={{ fontSize: 16, marginBottom: 20 }}>Messaging</Text>
            <MessagePreview setChat={setChat} />
            <MessagePreview setChat={setChat} />
          </>
        )}
      </Card>
    </div>
  );
}

export default Messaging;
