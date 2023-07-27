import { Button, Flex, Text } from "@mantine/core";
import { palette } from "@/theme/palette";

type CarbonClaimCardProps = {
  amount?: number;
};

function CarbonClaimCard({ amount = 0 }: CarbonClaimCardProps) {
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
          WITHDRAW
        </Button>
      </Flex>
    </Flex>
  );
}

export default CarbonClaimCard;
