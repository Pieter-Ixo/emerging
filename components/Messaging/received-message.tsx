import { palette } from "@/theme/palette";
import { Avatar, Text } from "@mantine/core";
import React from "react";
import ProfileIconSample from "../Notifications/Icons/profile-icon-sample";

function ReceivedMessage() {
  return (
    <div
      style={{
        height: 90,
        backgroundColor: palette.Neutral200,
        borderRadius: 16,
        padding: 20,
        display: "flex",
        marginBottom: 8,
      }}
    >
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginRight: 15,
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: 500 }}>
            ixoabcde...12345
          </Text>
          <Text style={{ fontSize: 12, fontWeight: 500 }}>Date</Text>
        </div>

        <Text style={{ fontSize: 16, fontWeight: 300 }}>Message </Text>
      </div>
      <Avatar radius={100} h={50} w={50} mr={10}>
        <ProfileIconSample />
      </Avatar>
    </div>
  );
}

export default ReceivedMessage;
