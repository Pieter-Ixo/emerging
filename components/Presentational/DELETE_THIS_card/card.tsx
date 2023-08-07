import { HTMLAttributes } from "react";
import cls from "classnames";

import styles from "./card.module.scss";

// FIXME: EMERGING-140: remove from the app (use mantine card)

type CardProps = {} & HTMLAttributes<HTMLDivElement>;
function Card({ children, className, ...other }: CardProps) {
  return (
    <div className={cls(styles.card, className)} {...other}>
      {children}
    </div>
  );
}

export default Card;
