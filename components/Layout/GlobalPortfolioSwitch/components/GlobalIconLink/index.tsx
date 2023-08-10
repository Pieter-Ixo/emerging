import Link from "next/link";

import BaseIcon, { IconStatus } from "@/icons";
import GlobalIcon from "@/assets/icons/global.svg";

type Props = {
    status: IconStatus;
  };

function GlobalIconLink({ status }: Props) {
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
