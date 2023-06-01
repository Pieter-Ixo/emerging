import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import cls from "classnames";
import { useRouter } from "next/router";

import utilsStyles from "@/styles/utils.module.scss";
import styles from "@/styles/homePage.module.scss";
import Footer from "@/components/footer/footer";
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
import { Modal, ScrollArea } from "@mantine/core";
import { useScrollLock } from "@mantine/hooks";

interface Props {
  opened: boolean;
  onClose: () => void;
  id: number;
}

const CookstoveModal: React.FC<Props> = ({ opened, onClose, id }) => {
  useScrollLock(opened);
  const [loaded, setLoaded] = useState(true);
  const { stove, fetchStove, updateStove } = useCookstove();

  // useEffect(() => {
  //   console.log("in Cookstove effect id = ", id);
  //   console.log("in Cookstove effect stove = ", stove);
  //   if (id && id != stove.id) {
  //     console.log("in Cookstove effect Number(id) = ", Number(id));
  //     const deviceId = Number(id);
  //     console.log("in Cookstove effect deviceId = ", deviceId);
  //     if (deviceId) updateStove({ id: deviceId }, true);
  //   }
  //   console.log("in Cookstove effect loaded = ", loaded);
  //   if (!loaded) setLoaded(true);
  // }, [id, loaded, stove.id, updateStove]);

  useEffect(() => {
    if (!!id && stove.id !== id) {
      // updateStove({ id }, true);
      fetchStove(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stove.id]);

  if (!opened) {
    return null;
  }

  return (
    <Modal.Root
      opened={opened}
      onClose={onClose}
      radius={16}
      size="md"
      centered
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <Head>
        <title>Supamoto Dashboard</title>
        <meta name="description" content="Supamoto Dashboard" />
      </Head>

      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header style={{ height: 36 }}>
          <Modal.Title>Supamoto Dashboard</Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body className={utilsStyles.pageContainer}>
          {loaded && (!stove.loading || isNaN(Number(id))) ? (
            stove.sessions && stove.pellets ? (
              <>
                <h1 className={styles.title}>SUPAMOTO #{id}</h1>
                <section className={utilsStyles.column}>
                  <div className={cls(utilsStyles.flex)}>
                    <CarbonClaimCard amount={0.321} />
                    <PieChart amount={0.321} />
                    <PerformanceCard />
                    {/* <EventsCard events={['test']} /> */}

                    <div className={styles.rowCards}>
                      <Link href={`/household?id=${id}`}>
                        <ImageTextCard
                          Img={Household}
                          text="Visit the household"
                          vertical
                        />
                      </Link>
                      <Link href={`/benefits?id=${id}`}>
                        <ImageTextCard
                          Img={Sprout}
                          text="Explore the benefits of clean cooking"
                          vertical
                        />
                      </Link>
                    </div>
                    <Link href={`#`}>
                      <ImageTextCard
                        Img={Eye}
                        text="My Carbon Credits Activity"
                      />
                    </Link>
                  </div>
                </section>
              </>
            ) : (
              <>
                <h1 className={styles.title}>SUPAMOTO</h1>
                <section className={utilsStyles.column}>
                  <div
                    className={cls(utilsStyles.flex, utilsStyles.columnCenter)}
                  >
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
                <div
                  className={cls(utilsStyles.flex, utilsStyles.columnCenter)}
                >
                  <Loader size="60px" />
                  <p className={styles.emptyTitle}>LOADING</p>
                </div>
              </section>
            </>
          )}
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
    // <Modal opened={opened} onClose={onClose} radius={16} size="md">
    //   <div className={utilsStyles.pageContainer}>
    //     <Head>
    //       <title>Supamoto Dashboard</title>
    //       <meta name="description" content="Supamoto Dashboard" />
    //     </Head>

    //     <main className={utilsStyles.pageWidth}>
    //       {loaded && (!stove.loading || isNaN(Number(id))) ? (
    //         stove.sessions && stove.pellets ? (
    //           <>
    //             <h1 className={styles.title}>SUPAMOTO #{id}</h1>
    //             <section className={utilsStyles.column}>
    //               <div className={cls(utilsStyles.flex)}>
    //                 <CarbonClaimCard amount={0.321} />
    //                 <PieChart amount={0.321} />
    //                 <PerformanceCard />
    //                 {/* <EventsCard events={['test']} /> */}

    //                 <div className={styles.rowCards}>
    //                   <Link href={`/household?id=${id}`}>
    //                     <ImageTextCard
    //                       Img={Household}
    //                       text="Visit the household"
    //                       vertical
    //                     />
    //                   </Link>
    //                   <Link href={`/benefits?id=${id}`}>
    //                     <ImageTextCard
    //                       Img={Sprout}
    //                       text="Explore the benefits of clean cooking"
    //                       vertical
    //                     />
    //                   </Link>
    //                 </div>
    //                 <Link href={`#`}>
    //                   <ImageTextCard
    //                     Img={Eye}
    //                     text="My Carbon Credits Activity"
    //                   />
    //                 </Link>
    //               </div>
    //             </section>
    //           </>
    //         ) : (
    //           <>
    //             <h1 className={styles.title}>SUPAMOTO</h1>
    //             <section className={utilsStyles.column}>
    //               <div
    //                 className={cls(utilsStyles.flex, utilsStyles.columnCenter)}
    //               >
    //                 <Stove
    //                   height={80}
    //                   width={80}
    //                   className={styles.invertedImgStrokeColor}
    //                 />
    //                 <p className={styles.emptyTitle}>NO COOKSTOVE FOUND</p>
    //               </div>
    //             </section>
    //           </>
    //         )
    //       ) : (
    //         <>
    //           <h1 className={styles.title}>SUPAMOTO</h1>
    //           <section className={utilsStyles.column}>
    //             <div
    //               className={cls(utilsStyles.flex, utilsStyles.columnCenter)}
    //             >
    //               <Loader size="60px" />
    //               <p className={styles.emptyTitle}>LOADING</p>
    //             </div>
    //           </section>
    //         </>
    //       )}
    //     </main>
    //     <Footer />
    //   </div>
    // </Modal>
  );
};

export default CookstoveModal;
