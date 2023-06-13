// import Lottie from 'react-lottie-player';
import LottieLight from 'react-lottie-player/dist/LottiePlayerLight';

import loader from '@/assets/lotties/loader.json';

type LoaderProps = {
	size: string;
};

function Loader({ size }: LoaderProps) {
	return <LottieLight play loop animationData={loader} speed={1} style={{ height: size, width: size }} />;
}

export default Loader;
