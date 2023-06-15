import { PropsWithChildren } from "react";
import HeaderLogo from "@/components/Header_Logo/Index";
import {
  Anchor,
  Center,
  Container,
  Flex,
  Popover,
  Text,
  Alert,
  Dialog,
} from "@mantine/core";

import TruckSVG from "@/assets/icons/truck.svg";
import LeafSVG from "@/assets/icons/leaf.svg";
import styles from "@/styles/pages/indexPage.module.scss";

function NavLink({ href, children }: { href: string } & PropsWithChildren) {
  return (
    <Text ta="center" mt={32} p={20} className={styles.AnchorContainer}>
      <Anchor href={href} className={styles.Anchor}>
        {children}
      </Anchor>
    </Text>
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
              <NavLink href="">
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
      <Dialog opened size="lg" radius="md" position={{ top: 20, left: 20 }}>
        <Alert color="red" title="Web Application is under development">
          If you want to see the previous working UI version click{" "}
          <Anchor href="/collections-dashboard">here</Anchor>.
        </Alert>
      </Dialog>
    </Center>
  );
}
