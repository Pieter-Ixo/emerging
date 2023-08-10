import { useAppSelector } from "@/hooks/redux";
import PortfolioIconLink from "../PortfolioIconLink";

function PortfolioLink({ isSelected }: { isSelected: boolean }) {
    const userAddress = useAppSelector((state) => state.user.connectedWallet);
  
    if (!userAddress) return <PortfolioIconLink status="disabled" />;
  
    return <PortfolioIconLink status={isSelected ? "selected" : "notSelected"} />;
  }

  export default PortfolioLink;