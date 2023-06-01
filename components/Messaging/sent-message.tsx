import { palette } from "@/theme/palette";
import { Avatar, Text } from "@mantine/core";
import React from "react";
import ProfileIconSample from "../Notifications/Icons/profile-icon-sample";

function SentMessage() {
  return (
    <div
      style={{
        height: 90,
        padding: 20,
        display: "flex",
        marginBottom: 8,
      }}
    >
      <Avatar radius={100} h={50} w={50} mr={10}>
        <ProfileIconSample />
      </Avatar>
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginRight: 15,
          }}
        >
          <Text
            style={{ fontSize: 12, fontWeight: 500, color: palette.Neutral500 }}
          >
            me
          </Text>
          <Text
            style={{ fontSize: 12, fontWeight: 500, color: palette.Neutral500 }}
          >
            Date
          </Text>
        </div>

        <Text style={{ fontSize: 16, fontWeight: 300 }}>Message </Text>
      </div>
    </div>
  );
}

export default SentMessage;
