import { Button, Flex, Text } from "@mantine/core";
import { palette } from "@/theme/palette";
import { useMediaQuery } from "@mantine/hooks";

type CarbonClaimCardProps = {
  amount?: number;
};

function CarbonClaimCard({ amount = 0 }: CarbonClaimCardProps) {
  const isDesktopScreen = useMediaQuery("(min-width: 1680px)");

  let amountFs;
  let withdrawBtnW;
  let withdrawBtnFs;

  if (isDesktopScreen) {
    amountFs = "32px";
    withdrawBtnW = "50%";
    withdrawBtnFs = "24px";
  } else {
    amountFs = "24px";
    withdrawBtnW = "60%";
    withdrawBtnFs = "20px";
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
        backgroundColor: palette.fullBlue,
        borderRadius: 12,
      }}
    >
      <Text size="0.7rem" color={palette.White}>
        CARBON CREDITS AVAILABLE
      </Text>
      <Flex justify="space-between" align="end">
        <Flex align="end" pr={10} sx={{ color: palette.White }}>
          <Text lh={1} size={amountFs}>
            {amount.toLocaleString()}
          </Text>
          <Text size={14}>CARBON</Text>
        </Flex>
        <Button
          sx={{
            color: palette.White,
            fontSize: withdrawBtnFs,
            width: withdrawBtnW,
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
          WITHDRAW
        </Button>
      </Flex>
    </Flex>
  );
}

export default CarbonClaimCard;
