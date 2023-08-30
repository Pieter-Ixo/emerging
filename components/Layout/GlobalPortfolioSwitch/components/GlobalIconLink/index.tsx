import Link from "next/link";

import BaseIcon from "@/components/Presentational/BaseIcon";
import GlobalIcon from "@/assets/icons/global.svg";

type Props = {
  isSelected: boolean;
};

export default function GlobalIconLink({ isSelected }: Props) {
  const status = isSelected ? "selected" : "notSelected";

  return (
    <Link href="/collections/global">
      <BaseIcon
        Icon={GlobalIcon}
        width={24}
        cursorMode="pointer"
        height={25}
        status={status}
        variant="circle"
      />
    </Link>
  );
}
