import { BackgroundImage, Box, Container, Title } from "@mantine/core";
import { useRouter } from "next/navigation";

import useValueFromRouter from "@/utils/useValueFromRouter";
import ImageTextCard from "@/components/Presentational/ImageTextCard";
import HouseholdSVG from "@/assets/icons/household.svg";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";
import { palette } from "@/theme/palette";
import BaseIcon from "@/components/Presentational/BaseIcon";
import BaseDeviceCard from "@/components/Presentational/BaseDeviceCard";

export default function DeviceTransactions() {
  const router = useRouter();

  const entityExternalId = useValueFromRouter<string>("entityId");

  return (
    <BackgroundImage src="/images/background.jpg">
      <Container maw="600px" mih="100vh" py="lg">
        <Title
          order={2}
          align="center"
          color={palette.White}
          weight={400}
          pb="lg"
        >
          Supamoto #{entityExternalId}
        </Title>
        <Box style={{ position: "relative" }}>
          <ImageTextCard
            Img={HouseholdSVG}
            text="Visit the household"
            vertical
          />
          <BaseIcon
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              margin: "1em",
              cursor: "pointer",
            }}
            onClick={() => router.back()}
            Icon={ArrowLeftIcon}
          />
        </Box>
        <BaseDeviceCard title="TRANSACTIONS">
          <div>Hello</div>
        </BaseDeviceCard>
      </Container>
    </BackgroundImage>
  );
}
