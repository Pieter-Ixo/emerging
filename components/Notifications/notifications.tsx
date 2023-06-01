import React from "react";
import { Card, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { mobileBreakpoint, tabletBreakpoint } from "@/constants/breakpoints";
import SingleNotification from "./single-notification";
import ProfileIconSample from "./Icons/profile-icon-sample";

interface Props {
  viewMessage: any;
}

function Notifications({ viewMessage }: Props) {
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
        }}
      >
        <Text style={{ fontSize: 16, marginBottom: 20 }}>Notifications</Text>
        <SingleNotification
          sender="Clean Cooking Company"
          icon={<ProfileIconSample />}
          message="Your Stove NFT's user has purchased 30kg of pellets."
          viewMessage={viewMessage}
        />
        <SingleNotification
          sender="Clean Cooking Company"
          icon={<ProfileIconSample />}
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          viewMessage={viewMessage}
        />
      </Card>
    </div>
  );
}

export default Notifications;
