import { PropsWithChildren } from "react";
import HeaderLogo from "@/components/Header_Logo/Index";
import {
  Anchor,
  Box,
  Center,
  Container,
  Flex,
  Popover,
  Text,
} from "@mantine/core";

import TruckSVG from "@/assets/icons/truck.svg";
import LeafSVG from "@/assets/icons/leaf.svg";
import { palette } from "@/theme/palette";

// eslint-disable-next-line react/require-default-props
function NavLink({ href, children }: { href?: string } & PropsWithChildren) {
  return (
    <Anchor
      href={href}
      underline={false}
      color={palette.Black}
      display="block"
      size="32px"
      mb={32}
      lh="lg"
    >
      <Container
        ta="center"
        p={20}
        bg={palette.White}
        sx={{ borderRadius: "16px" }}
        w="300px"
      >
        {children}
      </Container>
    </Anchor>
  );
}

export default function Home() {
  return (
    <Center h="100vh" mx="auto">
      <Container>
        <Flex gap={70} justify="flex-start" align="center" direction="column">
          <HeaderLogo />
          <Text mt="md" mb={70}>
            Please choose which dashboard you would like to use.
          </Text>
        </Flex>
        <Popover width={200} position="bottom" withArrow shadow="md">
          <Popover.Target>
            <Container>
              <NavLink>
                <TruckSVG aria-hidden width={70} height={70} alt="" />
                <Text>Distributor</Text>
              </NavLink>
            </Container>
          </Popover.Target>
          <Popover.Dropdown>
            <Text size="sm">Distributor page is not available yet</Text>
          </Popover.Dropdown>
        </Popover>
        <NavLink href="/collections">
          <LeafSVG aria-hidden width={70} height={70} alt="" />
          <Text>Asset Owner</Text>
        </NavLink>
      </Container>
    </Center>
  );
}
