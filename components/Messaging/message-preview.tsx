import { palette } from "@/theme/palette";
import { Avatar, Text } from "@mantine/core";
import React from "react";
import ProfileIconSample from "../Notifications/Icons/profile-icon-sample";

interface Props {
  setChat: any;
}

function MessagePreview({ setChat }: Props) {
  return (
    <div
      style={{
        height: 90,
        backgroundColor: palette.Neutral200,
        borderRadius: 16,
        padding: 20,
        display: "flex",
        marginBottom: 8,
        cursor: "pointer",
      }}
      onClick={() => {
        setChat(true);
      }}
    >
      <Avatar radius={100} h={50} w={50} mr={10}>
        <ProfileIconSample />
      </Avatar>
      <div>
        <Text style={{ fontSize: 12, fontWeight: 500 }}>ixoabcde...12345</Text>
        <Text style={{ fontSize: 16, fontWeight: 300 }}>Message Preview</Text>
      </div>
    </div>
  );
}

export default MessagePreview;
