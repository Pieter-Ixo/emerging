import { Card, Container, Flex, Text } from "@mantine/core";

import { palette } from "@/theme/palette";

function DetailCard() {
  return (
    <Card radius={16} mih={400}>
      <Flex
        align="center"
        justify="space-between"
        sx={{ borderBottom: `1px solid ${palette.Black}` }}
      >
        <Text>DETAIL</Text>
        <Text>DOWNLOAD ➔</Text>
      </Flex>
      <Container id="detail-portal-target" p={0} />
    </Card>
  );
}

export default DetailCard;
