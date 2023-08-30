import BaseIcon from "@/components/Presentational/BaseIcon";
import Link from "next/link";
import PortfolioIcon from "@/assets/icons/portfolio.svg";
import { useAppSelector } from "@/hooks/redux";

type Props = {
  isSelected: boolean;
};
export default function PortfolioIconLink({ isSelected }: Props) {
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
        cursorMode="pointer"
        status={status}
        variant="circle"
      />
    </Link>
  );
}
