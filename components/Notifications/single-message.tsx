import React from "react";
import { Card, Text, Avatar } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { tabletBreakpoint } from "@/constants/breakpoints";
import ProfileIconSample from "./Icons/profile-icon-sample";
import Cross from "../myPortfolio/icons/cross";

interface Props {
  message: String;
  //   date: String;
  sender: String;
  icon: any;
  viewMessage: any;
}

function SingleMessage({ message, sender, icon, viewMessage }: Props) {
  const viewPortSize = useViewportSize();

  function handleClick() {
    viewMessage({ visible: false, sender: "", message: "", icon: "" });
  }
  return (
    <div>
      <Card
        shadow="sm"
        p="lg"
        radius={16}
        withBorder
        style={{
          width: viewPortSize.width >= tabletBreakpoint ? 312 : 358,
        }}
      >
        <div
          style={{
            height: 70,
            marginBottom: 20,
            display: "flex",
          }}
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
            <Text style={{ fontSize: 12, fontWeight: 300 }}>Date</Text>
            <Text style={{ fontSize: 16, fontWeight: 300, marginBottom: 4 }}>
              {sender}
            </Text>
          </div>
          <div onClick={() => handleClick()} style={{ cursor: "pointer" }}>
            <Cross />
          </div>
        </div>
        <div>
          <Text style={{ fontSize: 16, fontWeight: 400 }}>{message}</Text>
        </div>
      </Card>
    </div>
  );
}

export default SingleMessage;
