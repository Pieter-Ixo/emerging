import { Image, ImageProps } from "@mantine/core";

export default function AstroBatchImage(props: ImageProps) {
  return (
    <Image
      width={80}
      height={80}
      src="/images/carbon-logo-lg.svg"
      alt=""
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}
