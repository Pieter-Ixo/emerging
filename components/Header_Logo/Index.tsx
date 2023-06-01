import { Text } from "@mantine/core";
import EmergingLogo from "./Icon_Header/emerging";

export default function HeaderLogo() {
  return (
    <>
      <EmergingLogo />
      <Text
      className="logo-text-font"
        style={{
          fontSize: 30,
          color: "#13263D",
          paddingTop: 3,
          fontWeight: 400,
          letterSpacing: 1.4,
        }}
      >
        emerging
      </Text>
    </>
  );
}
