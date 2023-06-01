import { HTMLAttributes } from 'react';
import cls from 'classnames';
import Image from 'next/image';

import Card from '@/components/card/card';
import styles from './card-benefits.module.scss';
import cardStyles from '../card/card.module.scss';

type BenefitsCardProps = {
	Img?: any;
	images?: string[];
	title: string;
	text: string;
	invertedImg?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const BenefitsCard = ({ Img, images, title, text, className, children, invertedImg = false, ...other }: BenefitsCardProps) => {
	return (
		<Card className={cls(styles.benefitsCard, className)} {...other}>
			{Img ? <Img width={45} height={45} className={cls({ [cardStyles.invertedImgStrokeColor]: invertedImg, [cardStyles.invertedImgColor]: !invertedImg })} /> : null}
			{images ? (
				<div className={styles.images}>
					{images.map(i => (
						<Image key={i} src={i} alt="image" width={62} height={47} />
					))}
				</div>
			) : null}
			<h4>{title}</h4>
			<p>{text}</p>
		</Card>
	);
};

export default BenefitsCard;
