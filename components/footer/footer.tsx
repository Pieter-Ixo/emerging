import Logo from '@/assets/icons/logo.svg';
import styles from './footer.module.scss';

type FooterProps = {
	showLinks?: boolean;
};

function Footer({ showLinks = true }: FooterProps) {
	return (
		<footer className={styles.footer}>
			{showLinks ? <p>T&Cs</p> : null}
			<a href="https://emerging.se/" target="_blank" rel="noopener noreferrer">
				<Logo width={60} height={40} color="white" />
			</a>
			{showLinks ? <p>FAQ</p> : null}
		</footer>
	);
}

export default Footer;
