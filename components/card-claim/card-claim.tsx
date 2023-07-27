import { Button, Flex, Text } from "@mantine/core";
import { palette } from "@/theme/palette";

type CarbonClaimCardProps = {
  amount: string;
};

function CarbonClaimCard({ amount }: CarbonClaimCardProps) {
  return (
    <Flex
      direction="column"
      gap="lg"
      justify="space-between"
      mb="md"
      p="md"
      sx={{
        backgroundColor: palette.fullBlue,
        borderRadius: 12,
      }}
    >
      <Flex
        direction="column"
        sx={{ fontSize: "0.7rem", color: palette.White }}
      >
        <Text>CARBON CREDITS AVAILABLE</Text>
      </Flex>
      <Flex justify="space-between" align="end">
        <Flex align="end" sx={{ color: palette.White }}>
          <Text sx={{ lineHeight: 1 }} size={40}>
            {amount}
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
