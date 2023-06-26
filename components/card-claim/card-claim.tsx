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
        cardStyles.accentBgColor,
        className
      )}
      {...other}
    >
      <div className={styles.textContainer}>
        <p>CARBON CREDITS AVAILABLE TO CLAIM</p>
        <p>Based on Carbon Emissions saved</p>
        <div className={cls(styles.amountContainer)}>
          <span className={styles.amount}>{amount}</span>
          CARBON
        </div>
      </div>
      <button>CLAIM</button>
    </Card>
  );
}

export default CarbonClaimCard;
