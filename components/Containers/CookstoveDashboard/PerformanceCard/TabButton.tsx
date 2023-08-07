import { ElementType } from "react";
import { Text, Box, Flex, UnstyledButton } from "@mantine/core";

// FIXME: EMERGING-140 remove scss
import styles from "./card-performance.module.scss";

export default function TabButton({
  name,
  isActive,
  onClick,
  Icon,
}: {
  name: string;
  isActive: boolean;
  onClick: () => void;
  Icon: ElementType;
}) {
  return (
    <UnstyledButton
      variant="subtle"
      h="unset"
      p={0}
      className={styles.section}
      onClick={onClick}
    >
      <Flex direction="column" align="center">
        <Box
          color="none"
          sx={{
            borderRadius: "50%",
            background: isActive ? "#ffffff" : "transparent",
            width: 42,
            height: 42,
            textAlign: "center",
            paddingTop: "5px",
          }}
        >
          <Icon width={32} height={32} />
        </Box>
        <Text>{name.toUpperCase()}</Text>
      </Flex>
    </UnstyledButton>
  );
}
