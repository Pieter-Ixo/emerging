import { CSSProperties } from "react";
import Link from "next/link";

import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";

import BaseIcon from "@/components/Presentational/BaseIcon";

type Props = {
  styles?: CSSProperties;
  link: string;
};

export default function ArrowBackLink({ styles, link }: Props) {
  return (
    <Link href={link}>
      <BaseIcon
        style={{
          position: "absolute",
          cursor: "pointer",
          ...styles,
        }}
        Icon={ArrowLeftIcon}
      />
    </Link>
  );
}
