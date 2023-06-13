import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import utilsStyles from "@/styles/utils.module.scss";
import styles from "@/styles/homePage.module.scss";
import Footer from "@/components/footer/footer";
import BenefitsCard from "@/components/card-benefits/card-benefits";
import Stove from "@/icons/stove.svg";
import Pot from "@/icons/pot.svg";
import Sprout from "@/icons/sprout.svg";

function Benefits() {
  console.log("in Benefits");
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className={utilsStyles.pageContainer}>
      <Head>
        <title>Benefits</title>
        <meta
          name="description"
          content="Supamoto Benefist - Explore the benefits and impact of the Supamoto Cookstoves"
        />
      </Head>

      <main className={utilsStyles.pageWidth}>
        <h1 className={styles.title}>SUPAMOTO{id ? ` #${id}` : ""}</h1>

        <section className={utilsStyles.column}>
          <div className={utilsStyles.flex}>
            <BenefitsCard
              Img={Stove}
              invertedImg
              title="The problem"
              text="Million households still prepare their daily meals on open fires using polluting  charcoal and firewood. This is producing dirty carbon emissions on the scale of the entire airline industry. It is destroying the environment by chopping down hardwood forests and is havining a negative impact on the health and wellbing of families."
            />
            <BenefitsCard
              Img={Stove}
              invertedImg
              title="The Supamoto Solution"
              text="For half the monthly costs of buying dirty charcoal  or Kerosene fuel, emerging households can now cook with clean fuel and a convenient modern cookstove that also generates Carbon Credits."
            />
            <BenefitsCard
              Img={Pot}
              invertedImg
              title="How it works"
              text="Each SupaMoto stove has a live cellular connection to the ixo Internet of Impact. This streams cooking session data that can be viewed real-time on the Supamoto dashboard. Cookstove users get immediate customer support if their device goes offline or is not functioning optimally."
            />
            <BenefitsCard
              Img={Sprout}
              title="SupaMoto Impact Tokens"
              text="Each SupaMoto Stove has its digital twin SupaMoto NFT. When you purchase a Supamoto NFT this pays for a family to get a free device for as long as they subscribe to receive a monthy supply of Renewable Biofuel Pellets"
            />
            <BenefitsCard
              images={[
                "/images/family.png",
                "/images/bowl.png",
                "/images/heart-rate.png",
                "/images/genders.png",
                "/images/power.png",
                "/images/eye-earth.png",
              ]}
              title="Sustainable development"
              text="The project is targeting 6 Sustainable Development Goals: No Poverty, Zero Hunger, Good Health and Well-being, Gender Equality, Affordable and Clean Energy and Climate Action."
            />
          </div>
          <Footer />
        </section>
      </main>
    </div>
  );
}

export default Benefits;
