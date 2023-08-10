import { Button, Flex, Text } from "@mantine/core";
import { palette } from "@/theme/palette";
import { useMediaQuery } from "@mantine/hooks";

type CarbonIssueCardProps = {
  amount?: number;
};

function CarbonIssueCard({ amount = 0 }: CarbonIssueCardProps) {
  const isDesktopScreen = useMediaQuery("(min-width: 1680px)");

  let amountFs;
  let issueBtnW;
  let issueBtnFs;

  if (isDesktopScreen) {
    amountFs = "32px";
    issueBtnW = "50%";
    issueBtnFs = "24px";
  } else {
    amountFs = "24px";
    issueBtnW = "60%";
    issueBtnFs = "20px";
  }
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
          <Text lh={1} size={amountFs}>
            {amount.toLocaleString()}
          </Text>
          <Text size={14}>CARBON</Text>
        </Flex>
        <Button
          sx={{
            color: palette.White,
            fontSize: issueBtnFs,
            width: issueBtnW,
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
