import { Button, Flex, MediaQuery, Text } from "@mantine/core";
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
        <Flex align="end" pr={10} sx={{ color: palette.White }}>
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
            disabled
            radius="md"
            size="lg"
            uppercase
          >
            WITHDRAW
          </Button>
        </MediaQuery>
      </Flex>
    </Flex>
  );
}

export default CarbonClaimCard;
