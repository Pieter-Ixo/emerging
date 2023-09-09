import { Button, Flex, MediaQuery, Text } from "@mantine/core";
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
      mih={140}
      p="md"
      sx={{
        backgroundColor: palette.accentLight,
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
          <MediaQuery smallerThan="xl" styles={{ fontSize: 24 }}>
            <Text lh={1} size={32}>
              {amount.toLocaleString()}
            </Text>
          </MediaQuery>
          <Text size={14}>CARBON</Text>
        </Flex>
        <MediaQuery smallerThan="xl" styles={{ fontSize: 16, width: "60%" }}>
          <Button
            sx={{
              color: palette.White,
              fontSize: "20px",
              width: "50%",
              fontWeight: 400,
              padding: 0,
              backgroundColor: palette.whiteTransparent,
              border: `1px solid ${palette.whiteTransparent}`,
            }}
            variant="outline"
            disabled={amount === 0}
            radius="md"
            size="lg"
            uppercase
          >
            Issue
          </Button>
        </MediaQuery>
      </Flex>
    </Flex>
  );
}

export default CarbonIssueCard;
