import HeaderLogo from "@/components/Header_Logo/Index";
import { Anchor, Center, Container, Flex, Popover, Text } from "@mantine/core";

import TruckSVG from "@/assets/icons/truck.svg";
import LeafSVG from "@/assets/icons/leaf.svg";

export default function Home() {
  return (
    <Center h="100vh" mx="auto">
      <Container>
        <Flex gap={70} justify="flex-start" align="center" direction="column">
          <HeaderLogo />
          <Text mt="md">
            Please choose which dashboard you would like to use.
          </Text>
        </Flex>
        <Text
          ta="center"
          mt={70}
          p={20}
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "16px",
          }}
        >
          <Popover width={200} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <Anchor
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  fontSize: 32,
                  fontWeight: 300,
                  lineHeight: "48px",
                }}
              >
                <TruckSVG aria-hidden width={70} height={70} alt="" />
                <Text>Distributor</Text>
              </Anchor>
            </Popover.Target>
            <Popover.Dropdown>
              <Text size="sm">Distributor page is not available yet</Text>
            </Popover.Dropdown>
          </Popover>
        </Text>
        <Text
          ta="center"
          mt={32}
          p={20}
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "16px",
          }}
        >
          <Anchor
            href="/collections"
            style={{
              color: "inherit",
              textDecoration: "none",
              fontSize: 32,
              fontWeight: 300,
              lineHeight: "48px",
            }}
          >
            <LeafSVG aria-hidden width={70} height={70} alt="" />
            <Text>Asset Owner</Text>
          </Anchor>
        </Text>
      </Container>
    </Center>
  );
}
