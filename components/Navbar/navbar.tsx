import { useEffect } from "react";
import Link from "next/link";
import { Box, Flex, Navbar } from "@mantine/core";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { palette } from "@/theme/palette";
import { selectUserEntityCollections } from "@/redux/entityCollections/selectors";
import { fillEntitiesForUserCollections } from "@/redux/entityCollections/thunks";

import ConnectedAccount from "../connectedAccount/connected_account";
import ImpactCreditsCard from "../userBalance/ImpactCreditsCard";
import HeaderLogo from "../Header_Logo/Index";

export default function Nav() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const userEntityCollections = useAppSelector(selectUserEntityCollections);

  useEffect(() => {
    userEntityCollections.forEach((userEntityCollection) => {
      dispatch(fillEntitiesForUserCollections(userEntityCollection));
    });
  }, [dispatch, userEntityCollections]);

  return (
    <Navbar
      p="xs"
      width={{ base: 360, sm: 360 }}
      h="100%"
      mih="100vh"
      bg={palette.Neutral200}
      withBorder={false}
    >
      <Navbar.Section p="xs" style={{ paddingBottom: 10 }}>
        <Flex justify="center" sx={{ padding: "20px 0px" }}>
          <Link href="/">
            <HeaderLogo />
          </Link>
        </Flex>
      </Navbar.Section>
      <Box sx={{ width: "100%" }}>
        <Navbar.Section p="xs">
          <ConnectedAccount />
        </Navbar.Section>
      </Box>
      {user.walletConnected && (
        <Navbar.Section p="xs">
          <ImpactCreditsCard />
        </Navbar.Section>
      )}
    </Navbar>
  );
}
