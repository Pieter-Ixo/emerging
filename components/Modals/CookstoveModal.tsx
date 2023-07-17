import { useEffect, useState } from "react";
import cls from "classnames";

import utilsStyles from "@/styles/utils.module.scss";
import styles from "@/styles/homePage.module.scss";
import Stove from "@/assets/icons/stove.svg";
import Household from "@/assets/icons/household.svg";
import Sprout from "@/assets/icons/sprout.svg";
import Eye from "@/assets/icons/eye.svg";
import { useCookstove } from "@/context/cookstove";
import Loader from "@/components/loader/loader";
import Link from "next/link";
import PieChart from "@/components/pie-chart/pie-chart";
import CarbonClaimCard from "@/components/card-claim/card-claim";
import ImageTextCard from "@/components/card-image-text/card-image-text";
import PerformanceCard from "@/components/card-performance/card-performance";
import { Box } from "@mantine/core";

interface Props {
  id: number | string;
}

export default function CookstoveModal({ id }: Props) {
  const [loaded] = useState(true);
  const { stove, fetchStove } = useCookstove();

  useEffect(() => {
    if (!!id && stove.id !== id) {
      fetchStove(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stove.id]);

  return (
    <Box className={utilsStyles.pageContainer}>
      {loaded && (!stove.loading || isNaN(Number(id))) ? (
        stove.sessions && stove.pellets ? (
          <>
            <h1 className={styles.title}>SUPAMOTO #{id}</h1>
            <section className={utilsStyles.column}>
              <div className={cls(utilsStyles.flex)}>
                <CarbonClaimCard amount="5,160" />
                <PieChart totalMinted={2580} totalTokenAmount={2580} />
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
          </>
        ) : (
          <>
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
          </>
        )
      ) : (
        <>
          <h1 className={styles.title}>SUPAMOTO</h1>
          <section className={utilsStyles.column}>
            <div className={cls(utilsStyles.flex, utilsStyles.columnCenter)}>
              <Loader size="60px" />
              <p className={styles.emptyTitle}>LOADING</p>
            </div>
          </section>
        </>
      )}
    </Box>
  );
}
