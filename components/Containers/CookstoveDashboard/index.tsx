import {
  BackgroundImage,
  Box,
  Container,
  Flex,
  Loader,
  Text,
  Title,
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

import CarbonIssueCard from "./CardIssue";

interface Props {
  entityExternalId: string;
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
}: Props) {
  const isCookstoveLoading = stove.loading || !entityExternalId;
  const isSessionsAndPelletsFound = !!(stove.sessions && stove.pellets);

  if (isCookstoveLoading)
    return (
      <BackgroundImage
        src="/images/background.jpg"
        pt={30}
        h="100vh"
        onClick={(e) => e.stopPropagation()}
      >
        <Container maw="600px">
          <Title ta="center" size={35} lts={1} color={palette.White} mb={15}>
            SUPAMOTO
          </Title>
          <Flex direction="column">
            <Flex align="center" direction="column">
              <Loader />
              <Text lts={2} mx={20} my={20} size={30}>
                LOADING
              </Text>
            </Flex>
          </Flex>
        </Container>
      </BackgroundImage>
    );

  if (isSessionsAndPelletsFound)
    return (
      <BackgroundImage
        src="/images/background.jpg"
        pt={30}
        h="100vh"
        onClick={(e) => e.stopPropagation()}
      >
        <Container maw="600px">
          <Title ta="center" size={35} lts={1} color={palette.White} mb={15}>
            SUPAMOTO
          </Title>
          <Flex direction="column">
            <Flex align="center" direction="column">
              <Stove height={80} width={80} />
              <Text lts={2} mx={20} my={20} size={30}>
                NO COOKSTOVE FOUND
              </Text>
            </Flex>
          </Flex>
        </Container>
      </BackgroundImage>
    );

  return (
    <BackgroundImage
      src="/images/background.jpg"
      onClick={(e) => e.stopPropagation()}
    >
      <Container maw="600px">
        <Title
          order={1}
          align="center"
          color={palette.White}
          weight={400}
          py="lg"
        >
          Supamoto #{entityExternalId}
        </Title>
        <Flex direction="column" pb={28}>
          <CarbonIssueCard amount={0} />
          <CarbonClaimCard amount={totalTokenAmount} />
          <PieChart
            totalTokenAmount={totalTokenAmount}
            totalMinted={totalMinted}
            totalOffset={totalOffset}
            totalTransferred={totalTransferred}
          />
          <PerformanceCard stove={stove} />

          <Flex mb={25} gap={25}>
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
              <ImageTextCard
                Img={Sprout}
                text="Explore the benefits of clean cooking"
                vertical
              />
            </Box>
          </Flex>

          <ImageTextCard Img={Eye} text="Carbon Credit Transactions" />
        </Flex>
      </Container>
    </BackgroundImage>
  );
}
