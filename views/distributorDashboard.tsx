import NoAccount from "@/components/connectedAccount/no_account";
import EmergingAssets from "@/components/emergingAssets/emerging_assets";
import GraphPerf from "@/components/graphPerf/graphPerf";
import ImpactsSaved from "@/components/Impacts/impacts_saved";
import InventoryList from "@/components/Inventory/inventory_list";
import NFT_List from "@/components/Inventory/NFT's_List";
import NewsCard from "@/components/news/news_card";
import tabsDist from "@/components/tabs/tabData_Distributor";
import DistTabComponent from "@/components/tabs/tabDistributorComponent";
import { selectAuthState } from "@/redux/userSlice";
import Loading from "@/components/Inventory/Fallback/loading";
import { mobileBreakpoint, tabletBreakpoint } from "@/constants/breakpoints";
import {
  Card,
  Text,
  Divider,
  Group,
  Badge,
  Grid,
  Col,
  Image,
  Table,
  Center,
  Stack,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useRouter } from "next/router";

import { Suspense, useState } from "react";
import { useSelector } from "react-redux";

function DistributorDashboard() {

  const connectWallet = useSelector(selectAuthState);
  const viewPortSize = useViewportSize();
  const router = useRouter()
  const [tab, setTab] = useState<string>("Sessions");

  //const test = router.query

  console.log("router:", router.asPath)

  const handleTabChange = (id: string) => {

    setTab(id)

  };

  function currentTab(id: string) {
    switch (id) {
      case "Inventory":
        return <InventoryList />
      case "NFTs":
        return <NFT_List />
      default:
        return <InventoryList />
    }
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {connectWallet.walletConnected ? (
        <>
          <div>
            <Text style={{ fontSize: 40, paddingLeft: 40, paddingTop: 20 }}>
              Distributor Dashboard
            </Text>
            <Group style={{ margin: 20, marginBottom: 0 }}>
              <DistTabComponent
                tabsDist={tabsDist}
                getTabId={handleTabChange}
              />
            </Group>
          </div>
          <div style={{ display: "flex", padding: 20, paddingTop: 10 }}>

            {currentTab(tab)}

          </div>
        </>
      ) : (
        <>
          {viewPortSize.width >= tabletBreakpoint ? (
            <Center style={{ width: "75vw", height: "100%" }}>
              <NoAccount />
            </Center>
          ) : (
            <Stack style={{ height: "100%", justifyContent: "center" }}>
              <NoAccount />
            </Stack>
          )}
        </>
      )}
    </div>
  );
}

export default DistributorDashboard;
