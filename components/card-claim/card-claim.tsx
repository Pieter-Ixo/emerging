import { HTMLAttributes } from "react";
import cls from "classnames";

import Card from "@/components/card/card";
import styles from "./card-claim.module.scss";
import cardStyles from "../card/card.module.scss";

type CarbonClaimCardProps = {
  amount: string;
} & HTMLAttributes<HTMLDivElement>;

function CarbonClaimCard({
  amount,
  className,
  children,
  ...other
}: CarbonClaimCardProps) {
  return (
    <Card
      className={cls(
        styles.carbonClaimCard,
        cardStyles.invertedTextColor,
        cardStyles.accentBgColorFull,
        className
      )}
      {...other}
    >
      <div className={styles.textContainer}>
        <p>CARBON CREDITS AVAILABLE</p>
      </div>
      <div className={styles.bottomContainer}>
        <div className={cls(styles.amountContainer)}>
          <span className={styles.amount}>{amount}</span>
          CARBON
        </div>
        <button>WITHDRAW</button>
      </div>
    </Card>
  );
}

export default CarbonClaimCard;
