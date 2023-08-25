import {
  BackgroundImage,
  Box,
  Container,
  Flex,
  Loader,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import Link from "next/link";

import Stove from "@/assets/icons/stove.svg";
import HouseholdSVG from "@/assets/icons/household.svg";
import Sprout from "@/assets/icons/sprout.svg";
import Eye from "@/assets/icons/eye.svg";

import PieChart from "@/components/Presentational/PieChart";
import CarbonClaimCard from "@/components/Containers/CookstoveDashboard/CardClaim";
import ImageTextCard from "@/components/Presentational/ImageTextCard";
import PerformanceCard from "@/components/Containers/CookstoveDashboard/PerformanceCard";
import { STOVE } from "@/types/stove";
import { palette } from "@/theme/palette";
import { useAppSelector } from "@/hooks/redux";

import CarbonIssueCard from "./CardIssue";

interface Props {
  entityExternalId: string;
  ownerAddress?: string;
  stove: STOVE;
  totalMinted?: number;
  totalTokenAmount?: number;
  totalOffset?: number;
  totalTransferred?: number;
}

export default function CookstoveDashboard({
  entityExternalId,
  stove,
  totalMinted,
  totalTokenAmount,
  totalOffset,
  totalTransferred,
  ownerAddress,
}: Props) {
  const isCookstoveLoading = stove.loading || !entityExternalId;
  const isSessionsAndPelletsFound = !!(stove.sessions && stove.pellets);

  const userAddress = useAppSelector((state) => state.user.connectedWallet);

  if (isCookstoveLoading)
    return (
      <BackgroundImage
        src="/images/background.jpg"
        h="100vh"
        onClick={(e) => e.stopPropagation()}
      >
        <Container maw="600px" py="lg">
          <Title ta="center" size={35} lts={1} color={palette.White} mb="lg">
            SUPAMOTO
          </Title>
          <Flex align="center" direction="column">
            <Loader />
            <Text lts={2} mt="lg" size={30}>
              LOADING
            </Text>
          </Flex>
        </Container>
      </BackgroundImage>
    );

  if (!isSessionsAndPelletsFound)
    return (
      <BackgroundImage
        src="/images/background.jpg"
        h="100vh"
        onClick={(e) => e.stopPropagation()}
      >
        <Container maw="600px" py="lg">
          <Title ta="center" size={35} lts={1} color={palette.White} mb="lg">
            SUPAMOTO
          </Title>
          <Flex align="center" direction="column">
            <Stove height={80} width={80} />
            <Text lts={2} mt="lg" size={30}>
              NO COOKSTOVE FOUND
            </Text>
          </Flex>
        </Container>
      </BackgroundImage>
    );

  return (
    <BackgroundImage
      src="/images/background.jpg"
      onClick={(e) => e.stopPropagation()}
    >
      <Container maw="600px" py="lg">
        <Title
          order={2}
          mb="md"
          align="center"
          color={palette.White}
          weight={400}
        >
          Supamoto #{entityExternalId}
        </Title>
        <Flex direction="column">
          {userAddress && userAddress === ownerAddress && (
            <>
              <CarbonIssueCard amount={0} />
              <CarbonClaimCard amount={totalTokenAmount} />
            </>
          )}

          <PieChart
            totalTokenAmount={totalTokenAmount}
            totalMinted={totalMinted}
            totalOffset={totalOffset}
            totalTransferred={totalTransferred}
          />
          <PerformanceCard stove={stove} />

          <Flex mb="xl" gap="xl">
            <Box w="100%">
              <Link href={`/devices/${entityExternalId}/household`}>
                <ImageTextCard
                  Img={HouseholdSVG}
                  text="Visit the household"
                  vertical
                />
              </Link>
            </Box>
            <Box w="100%">
              <Link target="_blank" href="https://cleancooking.org/the-value-of-clean-cooking/">
                <ImageTextCard
                  Img={Sprout}
                  text="Explore the benefits of clean cooking"
                  vertical
                />
              </Link>
            </Box>
          </Flex>
          <Tooltip label="this page is under development">
            <ImageTextCard Img={Eye} text="Carbon Credit Transactions" />
          </Tooltip>
        </Flex>
      </Container>
    </BackgroundImage>
  );
}
