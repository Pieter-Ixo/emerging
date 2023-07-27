import { HTMLAttributes } from "react";
import cls from "classnames";

import Card from "@/components/card/card";
import styles from "./card-claim.module.scss";
import cardStyles from "../card/card.module.scss";

type CarbonClaimCardProps = {
  amount: string;
  claimType: "available" | "issue";
} & HTMLAttributes<HTMLDivElement>;

function CarbonClaimCard({
  amount,
  claimType,
  className,
  children,
  ...other
}: CarbonClaimCardProps) {
  const isAvailable = claimType === "available";
  const isAvailableStyles = isAvailable
    ? cls(
        styles.carbonClaimCard,
        cardStyles.invertedTextColor,
        cardStyles.accentBgColorFull,

        className
      )
    : cls(
        styles.carbonClaimCard,
        cardStyles.invertedTextColor,
        cardStyles.accentBgColor,

        className
      );

  const actionText = isAvailable ? "WITHDRAW" : "ISSUE";
  const cardHint = isAvailable
    ? "CARBON CREDITS AVAILABLE"
    : "CARBON CREDITS TO ISSUE";

  return (
    <Card className={isAvailableStyles} {...other}>
      <div className={styles.textContainer}>
        <p>{cardHint}</p>
        {claimType === "issue" ? (
          <p>Based on Verified Emission Reductions</p>
        ) : null}
      </div>
      <div className={styles.bottomContainer}>
        <div className={cls(styles.amountContainer)}>
          <span className={styles.amount}>{amount}</span>
          CARBON
        </div>
        <button>{actionText}</button>
      </div>
    </Card>
  );
}

export default CarbonClaimCard;
