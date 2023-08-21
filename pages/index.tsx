import HeaderLogo from "@/components/Layout/Header_Logo/Index";
import { Center, Container, Flex, Popover, Text, Title } from "@mantine/core";

import TruckSVG from "@/assets/icons/truck.svg";
import LeafSVG from "@/assets/icons/leaf.svg";
import PageLink from "@/components/Pages/Index/PageLink";

export default function Home() {
  return (
    <Center h="100vh" mx="auto">
      <Container>
        <Flex gap={70} justify="flex-start" align="center" direction="column">
          <HeaderLogo />
          <Text size="md" fw={300} mt="md" mb={70}>
            Please choose which dashboard you would like to use.
          </Text>
        </Flex>
        <Popover width={200} position="bottom" withArrow shadow="md">
          <Popover.Target>
            <Container>
              <PageLink href="">
                <TruckSVG aria-hidden width={70} height={70} alt="" />
                <Title order={3} fw={300}>
                  Distributor
                </Title>
              </PageLink>
            </Container>
          </Popover.Target>
          <Popover.Dropdown>
            <Text size="xs">Distributor page is not available yet</Text>
          </Popover.Dropdown>
        </Popover>
        <PageLink href="/collections">
          <LeafSVG aria-hidden width={70} height={70} alt="" />
          <Title order={3} fw={300}>
            Asset Owner
          </Title>
        </PageLink>
      </Container>
    </Center>
  );
}
