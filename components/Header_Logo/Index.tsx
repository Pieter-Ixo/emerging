import { Flex, Text } from "@mantine/core";
import EmergingLogo from "./Icon_Header/emerging";

export default function HeaderLogo() {
  return (
    <Flex align="center" gap={8} style={{ cursor: "pointer" }}>
      <EmergingLogo />
      <Text
        style={{
          fontFamily: "Quicksand",
          fontSize: 30,
          color: "#13263D",
          paddingTop: 3,
          fontWeight: 400,
          letterSpacing: 1.4,
        }}
      >
        emerging
      </Text>
    </Flex>
  );
}
