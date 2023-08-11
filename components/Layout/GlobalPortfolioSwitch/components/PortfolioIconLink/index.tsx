import BaseIcon from "@/icons";
import Link from "next/link";
import PortfolioIcon from "@/assets/icons/portfolio.svg";
import { useAppSelector } from "@/hooks/redux";

type Props = {
  isSelected: boolean;
};
function PortfolioIconLink({ isSelected }: Props) {
  const status = isSelected ? "selected" : "notSelected";

  const userAddress = useAppSelector((state) => state.user.connectedWallet);

  if (!userAddress)
    return (
      <Link href="/collections/portfolio" style={{ pointerEvents: "none" }}>
        <BaseIcon
          Icon={PortfolioIcon}
          width={24}
          height={24}
          status="disabled"
          variant="circle"
        />
      </Link>
    );

  return (
    <Link href="/collections/portfolio">
      <BaseIcon
        Icon={PortfolioIcon}
        width={24}
        height={24}
        isPointer
        status={status}
        variant="circle"
      />
    </Link>
  );
}

export default PortfolioIconLink;
