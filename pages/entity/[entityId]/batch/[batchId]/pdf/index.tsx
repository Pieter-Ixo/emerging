import { Flex, Paper, Stack, Text } from "@mantine/core";

export default function BatchCertificatePdf() {
  return (
    <Flex
      h="100vh"
      mah="100vh"
      justify="center"
      align="center"
      direction="column"
    >
      <Paper shadow="xl" radius="xl" p="xl" withBorder>
        <Stack>
          <Text align="center">
            Once here you will be able to download a Carbon Certificate
            Document.
          </Text>
          <Text align="center">But yet this page is under development</Text>
        </Stack>
      </Paper>
    </Flex>
  );
}
