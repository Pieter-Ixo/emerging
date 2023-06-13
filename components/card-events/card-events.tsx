import { HTMLAttributes } from 'react';
import cls from 'classnames';

import Card from '@/components/card/card';
import ArrowRight from '@icons/arrow-right.svg';
import styles from './card-events.module.scss';

type EventsCardProps = {
	events: string[];
} & HTMLAttributes<HTMLDivElement>;

function EventsCard({ events, className, ...other }: EventsCardProps) {
	return (
		<Card className={cls(styles.eventCard, className)} {...other}>
			<div className={styles.header}>
				<p>LATEST EVENTS</p>
				<div className={styles.button}>
					VIEW ALL <ArrowRight width={18} height={18} />
				</div>
			</div>
			<div className={styles.textContainer}>{/* <p className={styles.text}>{text}</p> */}</div>
		</Card>
	);
}

export default EventsCard;
