import { HTMLAttributes } from "react";
import cls from "classnames";

import Card from "@/components/card/card";
import styles from "./card-claim.module.scss";
import cardStyles from "../card/card.module.scss";

type CarbonIssueCardProps = {
  amount: string;
} & HTMLAttributes<HTMLDivElement>;

function CarbonIssueCard({
  amount,
  className,
  children,
  ...other
}: CarbonIssueCardProps) {

  return (
    <Card className={cls(
      styles.carbonClaimCard,
      cardStyles.invertedTextColor,
      cardStyles.accentBgColor,

      className
    )} {...other}>
      <div className={styles.textContainer}>
        <p>CARBON CREDITS TO ISSUE</p>
        <p>Based on Verified Emission Reductions</p>
      </div>
      <div className={styles.bottomContainer}>
        <div className={cls(styles.amountContainer)}>
          <span className={styles.amount}>{amount}</span>
          CARBON
        </div>
        <button>ISSUE</button>
      </div>
    </Card>
  );
}

export default CarbonIssueCard;
