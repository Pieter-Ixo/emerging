import Link from "next/link";

import BaseIcon from "@/icons";
import GlobalIcon from "@/assets/icons/global.svg";

type Props = {
  isSelected: boolean;
  };

function GlobalIconLink({ isSelected }: Props) {
  const status = isSelected ? "selected" : "notSelected";

  return (
    <Link href="/collections/global">
      <BaseIcon
        Icon={GlobalIcon}
        width={24}
        isPointer
        height={25}
        status={status}
        variant="circle"
      />
    </Link>
  );
}

export default GlobalIconLink;
