import { BackgroundImage, Container, Title } from "@mantine/core";
import cls from "classnames";

import utilsStyles from "@/styles/utils.module.scss";
import styles from "@/styles/homePage.module.scss";
import Stove from "@/assets/icons/stove.svg";
import HouseholdSVG from "@/assets/icons/household.svg";
import Sprout from "@/assets/icons/sprout.svg";
import Eye from "@/assets/icons/eye.svg";
import Loader from "@/components/loader/loader";
import PieChart from "@/components/pie-chart/pie-chart";
import CarbonClaimCard from "@/components/CardClaim";
import ImageTextCard from "@/components/card-image-text/card-image-text";
import PerformanceCard from "@/components/card-performance/card-performance";
import { STOVE } from "@/types/stove";
import { palette } from "@/theme/palette";
import CarbonIssueCard from "../CardIssue";

interface Props {
  entityExternalId: number | string;
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
      <BackgroundImage src="/images/background.jpg">
        <Container maw="600px">
          <h1 className={styles.title}>SUPAMOTO</h1>
          <section className={utilsStyles.column}>
            <div className={cls(utilsStyles.flex, utilsStyles.columnCenter)}>
              <Loader size="60px" />
              <p className={styles.emptyTitle}>LOADING</p>
            </div>
          </section>
        </Container>
      </BackgroundImage>
    );

  if (!isSessionsAndPelletsFound)
    return (
      <BackgroundImage src="/images/background.jpg">
        <Container maw="600px">
          <h1 className={styles.title}>SUPAMOTO</h1>
          <section className={utilsStyles.column}>
            <div className={cls(utilsStyles.flex, utilsStyles.columnCenter)}>
              <Stove
                height={80}
                width={80}
                className={styles.invertedImgStrokeColor}
              />
              <p className={styles.emptyTitle}>NO COOKSTOVE FOUND</p>
            </div>
          </section>
        </Container>
      </BackgroundImage>
    );

  return (
    <BackgroundImage src="/images/background.jpg">
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
        <section className={utilsStyles.column}>
          <div className={cls(utilsStyles.flex)}>
            <CarbonIssueCard amount={0} />
            <CarbonClaimCard amount={totalTokenAmount} />
            <PieChart
              totalTokenAmount={totalTokenAmount}
              totalMinted={totalMinted}
              totalOffset={totalOffset}
              totalTransferred={totalTransferred}
            />
            <PerformanceCard stove={stove} />

            <div className={styles.rowCards}>
              <a href={`/devices/${entityExternalId}/household`}>
                <ImageTextCard
                  Img={HouseholdSVG}
                  text="Visit the household"
                  vertical
                />
              </a>
              <ImageTextCard
                Img={Sprout}
                text="Explore the benefits of clean cooking"
                vertical
              />
            </div>
            <ImageTextCard Img={Eye} text="Carbon Credit Transactions" />
          </div>
        </section>
      </Container>
    </BackgroundImage>
  );
}
