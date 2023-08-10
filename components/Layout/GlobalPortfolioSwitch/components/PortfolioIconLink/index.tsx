import BaseIcon, { IconStatus } from "@/icons";
import Link from "next/link";
import PortfolioIcon from "@/assets/icons/portfolio.svg";

type Props = {
  status: IconStatus;
};
function PortfolioIconLink({ status }: Props) {
  const isLinkDisabled = status === "disabled";
  return (
    <Link
      href="/collections/portfolio"
      style={{ pointerEvents: isLinkDisabled ? "none" : "all" }}
    >
      <BaseIcon
        Icon={PortfolioIcon}
        width={24}
        height={24}
        status={status}
        variant="circle"
      />
    </Link>
  );
}

export default PortfolioIconLink;
