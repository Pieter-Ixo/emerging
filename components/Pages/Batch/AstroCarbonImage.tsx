import { Image, ImageProps } from "@mantine/core";

export default function AstroCarbonImage(props: ImageProps) {
  return (
    <Image
      width={150}
      height={150}
      src="/images/carbon-logo-lg.svg"
      alt=""
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}
