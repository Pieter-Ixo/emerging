import { Flex, Text, Title } from "@mantine/core";

import AppLayout from "@/components/Layout/AppLayout";
import BaseIcon from "@/components/Presentational/BaseIcon";
import QuestionIcon from "@/assets/icons/question.svg";

export default function Error404() {
  return (
    <AppLayout title="Not found">
      <Flex direction="column" justify="center" align="center" mih="65vh">
        <BaseIcon
          width={81}
          height={81}
          style={{ marginBottom: 50 }}
          Icon={QuestionIcon}
        />
        <Title mb={16} order={4} fw={300}>
          Error 404
        </Title>
        <Text size="md" maw={200} ta="center">
          We can’t find the page you are looking for.
        </Text>
      </Flex>
    </AppLayout>
  );
}
