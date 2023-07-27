import { Button, Flex, Text } from "@mantine/core";
import { palette } from "@/theme/palette";

type CarbonIssueCardProps = {
  amount?: number;
};

function CarbonIssueCard({ amount = 0 }: CarbonIssueCardProps) {
  return (
    <Flex
      direction="column"
      gap="lg"
      justify="space-between"
      mb="md"
      p="md"
      sx={{
        backgroundColor: palette.issueBlue,
        borderRadius: 12,
      }}
    >
      <Flex
        direction="column"
        sx={{ fontSize: "0.7rem", color: palette.White }}
      >
        <Text>CARBON CREDITS TO ISSUE</Text>
        <Text>Based on Verified Emission Reductions</Text>
      </Flex>
      <Flex justify="space-between" align="end">
        <Flex align="end" sx={{ color: palette.White }}>
          <Text sx={{ lineHeight: 1 }} size={40}>
            {amount.toLocaleString()}
          </Text>
          <Text size={14}>CARBON</Text>
        </Flex>
        <Button
          sx={{
            color: palette.White,
            fontSize: 24,
            fontWeight: 400,
            backgroundColor: palette.whiteTransparent,
            border: `1px solid ${palette.whiteTransparent}`,
          }}
          variant="outline"
          radius="md"
          size="lg"
          uppercase
        >
          Issue
        </Button>
      </Flex>
    </Flex>
  );
}

export default CarbonIssueCard;
