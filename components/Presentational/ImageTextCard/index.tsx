import { ElementType, HTMLAttributes } from 'react';
import cls from 'classnames';

import Card from '@/components/Presentational/DELETE_THIS_card/card';
import styles from './card-image-text.module.scss';

type ImageTextCardProps = {
	Img: ElementType;
	text: string;
	vertical?: boolean;
} & HTMLAttributes<HTMLDivElement>;

// TODO: find appropriate place for this file
// TODO: use Mantine
function ImageTextCard({ text, Img, className, vertical = false, ...other }: ImageTextCardProps) {
	return (
		<Card className={cls(styles.imageTextCard, className, { [styles.vertical]: vertical })} {...other}>
			<Img width={45} height={45} />
			<div className={styles.textContainer}>
				<p className={styles.text}>{text}</p>
			</div>
		</Card>
	);
}

export default ImageTextCard;
