import { Button, Flex, Text } from "@mantine/core";
import { palette } from "@/theme/palette";
import { useMediaQuery } from "@mantine/hooks";

type CarbonClaimCardProps = {
  amount?: number;
};

function CarbonClaimCard({ amount = 0 }: CarbonClaimCardProps) {
  const isWideDesktopScreen = useMediaQuery("(min-width: 1440px)");

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
          <Text lh={1} size={isWideDesktopScreen ? 40 : 24}>
            {amount.toLocaleString()}
          </Text>
          <Text size={14}>CARBON</Text>
        </Flex>
        <Button
          sx={{
            color: palette.White,
            fontSize: isWideDesktopScreen ? "1.5rem" : "1.3rem",
            width: isWideDesktopScreen ? "50%" : "60%",
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
