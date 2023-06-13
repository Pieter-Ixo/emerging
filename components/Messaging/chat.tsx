import React, { useState } from "react";
import { Card, Input, Text, TextInput } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { mobileBreakpoint, tabletBreakpoint } from "@/constants/breakpoints";
import { palette } from "@/theme/palette";
import MessagePreview from "./message-preview";
import SendButton from "./icons/send-button";
import ReceivedMessage from "./received-message";
import SentMessage from "./sent-message";

function Chat() {
  const viewPortSize = useViewportSize();
  const [input, setInput] = useState("");
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ flex: 1 }}>
        <ReceivedMessage />
        <SentMessage />
      </div>

      <div
        style={{
          height: 70,
          backgroundColor: palette.Neutral200,
          width: "100%",
          padding: 10,
          paddingLeft: 20,
          borderRadius: 16,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <TextInput
          variant="unstyled"
          value={input}
          onChange={(event) => {
            console.log("Input", event.currentTarget.value);
            setInput(event.currentTarget.value);
          }}
          style={{ flex: 1 }}
          size="lg"
        />
        <div
          style={{ alignSelf: "center", paddingTop: 8, cursor: "pointer" }}
          onClick={() => console.log("Send", input)}
        >
          <SendButton />
        </div>
      </div>
    </div>
  );
}

export default Chat;
