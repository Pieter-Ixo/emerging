import { BackgroundImage, Box, Container } from "@mantine/core";
import cls from "classnames";

import utilsStyles from "@/styles/utils.module.scss";
import styles from "@/styles/homePage.module.scss";
import Stove from "@/assets/icons/stove.svg";
import Household from "@/assets/icons/household.svg";
import Sprout from "@/assets/icons/sprout.svg";
import Eye from "@/assets/icons/eye.svg";
import Loader from "@/components/loader/loader";
import Link from "next/link";
import PieChart from "@/components/pie-chart/pie-chart";
import CarbonClaimCard from "@/components/card-claim/card-claim";
import ImageTextCard from "@/components/card-image-text/card-image-text";
import PerformanceCard from "@/components/card-performance/card-performance";
import { STOVE } from "@/types/stove";

interface Props {
  id: number | string;
  stove: STOVE;
  totalMinted?: number;
  totalTokenAmount?: number;
}

export default function CookstoveDashboard({
  id,
  stove,
  totalMinted,
  totalTokenAmount,
}: Props) {
  const isCookstoveLoading = stove.loading || !id;
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

  const carbonClaimAmount = (totalTokenAmount || 0) + (totalMinted || 0);

  return (
    <BackgroundImage src="/images/background.jpg">
      <Container maw="600px">
        <h1 className={styles.title}>SUPAMOTO #{id}</h1>
        <section className={utilsStyles.column}>
          <div className={cls(utilsStyles.flex)}>
            <CarbonClaimCard amount={carbonClaimAmount.toLocaleString()} />
            <PieChart
              totalTokenAmount={totalTokenAmount || 0}
              totalMinted={totalMinted || 0}
            />
            <PerformanceCard stove={stove} />

            <div className={styles.rowCards}>
              <Link href="#">
                <ImageTextCard
                  Img={Household}
                  text="Visit the household"
                  vertical
                />
              </Link>
              <Link href="#">
                <ImageTextCard
                  Img={Sprout}
                  text="Explore the benefits of clean cooking"
                  vertical
                />
              </Link>
            </div>
            <Link href="#">
              <ImageTextCard Img={Eye} text="My Carbon Credits Activity" />
            </Link>
          </div>
        </section>
      </Container>
    </BackgroundImage>
  );
}
