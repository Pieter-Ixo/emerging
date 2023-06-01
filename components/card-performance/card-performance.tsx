import { HTMLAttributes, useState } from 'react';
import cls from 'classnames';

import Card from '@/components/card/card';
import styles from './card-performance.module.scss';
import Info from '@/assets/icons/info.svg';
import { sections, SECTIONS } from 'types/stove';
import Chart from '@/components/chart/chart';
import { useCookstove } from '@/context/cookstove';
import { hoursSaved, lifeYearsSaved } from '@/utils/supamoto';

type EventsCardProps = {} & HTMLAttributes<HTMLDivElement>;

const PerformanceCard = ({ className, ...other }: EventsCardProps) => {
	const { stove } = useCookstove();
	const [selectedSection, setSection] = useState<SECTIONS>(SECTIONS.sessions);
	const section = sections[selectedSection];

	const amount = () => {
		switch (section.id) {
			case SECTIONS.sessions:
				return stove.sessions?.totalElements;
			case SECTIONS.fuel:
				return stove.pellets?.totalPelletsAmount;
			case SECTIONS.time:
				return hoursSaved(stove.pellets?.totalPelletsAmount!);
			case SECTIONS.costs:
				return stove.pellets?.totalPelletsAmount;
			case SECTIONS.health:
				return lifeYearsSaved(stove.pellets?.totalPelletsAmount!);

			default:
				return;
		}
	};

	return (
		<Card className={cls(styles.performanceCard, className)} {...other}>
			<div className={styles.header}>
				<p>MY SUPAMOTO PERFORMANCE</p>
				<div className={styles.button}>
					<Info width={18} height={18} />
				</div>
			</div>

			<div className={styles.sections}>
				{Object.values(sections).map(({ id, Img, dataType }) =>
					// Temporary only use 2 sections till formulas for others in api
					[SECTIONS.sessions, SECTIONS.fuel].includes(id) ? (
						<div className={styles.section} key={id} onClick={() => setSection(id)}>
							<div className={cls(styles.circle, { [styles.selected]: id == selectedSection })}>
								<Img width={32} height={32} />
							</div>
							<p>{id.toUpperCase()}</p>
						</div>
					) : null,
				)}
			</div>

			<div className={styles.details}>
				<p className={styles.amount}>{amount()}</p>
				<p>{section.description}</p>
			</div>

			<Chart dataType={section.dataType} dataFormatter={section.dataFormatter} id={section.id} />
		</Card>
	);
};

export default PerformanceCard;
