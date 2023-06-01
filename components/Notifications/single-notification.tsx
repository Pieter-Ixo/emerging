import React from "react";
import { Text, Avatar } from "@mantine/core";
import ProfileIconSample from "./Icons/profile-icon-sample";

interface Props {
  icon: any;
  sender: String;
  message: String;
  viewMessage: any;
}

function SingleNotification({ icon, sender, message, viewMessage }: Props) {
  function handleClick() {
    viewMessage({
      visible: true,
      sender: sender,
      message: message,
      icon: icon,
    });
  }
  return (
    <div
      style={{
        height: 70,
        marginBottom: 10,
        display: "flex",
        cursor: "pointer",
      }}
      onClick={() => handleClick()}
    >
      <Avatar
        style={{
          borderRadius: "100%",
          height: 60,
          width: 60,
          margin: 5,
        }}
      >
        <ProfileIconSample />
      </Avatar>
      <div style={{ flex: 1, overflow: "hidden" }}>
        <Text style={{ fontSize: 12, fontWeight: 500, marginBottom: 4 }}>
          {sender}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: 400 }}>{message}</Text>
      </div>
    </div>
  );
}

export default SingleNotification;
