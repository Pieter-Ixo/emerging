import { Button, Flex, Text } from "@mantine/core";
import { palette } from "@/theme/palette";
import { useMediaQuery } from "@mantine/hooks";

type CarbonIssueCardProps = {
  amount?: number;
};

function CarbonIssueCard({ amount = 0 }: CarbonIssueCardProps) {
  const fontMedia = useMediaQuery("(min-width: 1440px)");

  return (
    <Flex
      direction="column"
      gap="lg"
      justify="space-between"
      mb="md"
      mih={140}
      p="md"
      sx={{
        backgroundColor: palette.secondaryBlue,
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
          <Text lh={1} size={fontMedia ? 40 : 24}>
            {amount.toLocaleString()}
          </Text>
          <Text size={14}>CARBON</Text>
        </Flex>
        <Button
          sx={{
            color: palette.White,
            fontSize: fontMedia ? "1.5rem" : "1.3rem",
            width: fontMedia ? "50%" : "60%",
            fontWeight: 400,
            padding: 0,
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
