import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import utilsStyles from '@styles/utils.module.scss';
import styles from '@styles/homePage.module.scss';
import Footer from '@/components/footer/footer';
import Image from 'next/image';
import { shimmerDataUrl } from '@/utils/image';

const Household = () => {
	console.log("in Household");
	const router = useRouter();
	const id = router.query.id;

	const images = ['/images/family1.png', '/images/family2.png', '/images/family3.png', '/images/family4.png'];

	return (
		<div className={utilsStyles.pageContainer}>
			<Head>
				<title>Household</title>
				<meta name="description" content="Supamoto Household - See the household using this Cookstove" />
			</Head>

			<main className={utilsStyles.pageWidth}>
				<h1 className={styles.title}>SUPAMOTO{id ? ` #${id}` : ''}</h1>

				<section className={utilsStyles.column}>
					<div className={utilsStyles.flex}>
						{images.map(i => (
							<div key={i} className={styles.householdImage}>
								<Image src={i} alt="family image" layout="fill" placeholder="blur" blurDataURL={shimmerDataUrl()} />
							</div>
						))}
					</div>
					<Footer />
				</section>
			</main>
		</div>
	);
};

export default Household;
