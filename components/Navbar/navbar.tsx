import { useEffect, useState } from "react";
import Link from "next/link";
import { Box, Flex, Navbar } from "@mantine/core";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { palette } from "@/theme/palette";
import {
  selectUserEntityCollections,
  selectUserEntityCollectionsIds,
} from "@/redux/entityCollections/selectors";
import { fillEntitiesForUserCollections } from "@/redux/entityCollections/thunks";
import isStringArraysEqual from "@/utils/isStringArraysEqual";

import ConnectAccountButton from "../connectedAccount/connected_account";
import ImpactCreditsCard from "../userBalance/ImpactCreditsCard";
import HeaderLogo from "../Header_Logo/Index";

export default function Nav() {
  const [idsList, setIdsList] = useState<string[]>([]);
  const userAddress = useAppSelector((state) => state.user.connectedWallet);
  const dispatch = useAppDispatch();
  const userEntityCollections = useAppSelector(selectUserEntityCollections);
  const userEntityCollectionsIds = useAppSelector(
    selectUserEntityCollectionsIds
  );

  useEffect(() => {
    if (
      userEntityCollectionsIds.length === 0 ||
      isStringArraysEqual(idsList, userEntityCollectionsIds)
    ) {
      return;
    }
    setIdsList(userEntityCollectionsIds);

    userEntityCollections.forEach((userEntityCollection) => {
      dispatch(fillEntitiesForUserCollections(userEntityCollection));
    });
  }, [userEntityCollectionsIds]);

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
          <ConnectAccountButton />
        </Navbar.Section>
      </Box>
      {userAddress && (
        <Navbar.Section p="xs">
          <ImpactCreditsCard />
        </Navbar.Section>
      )}
    </Navbar>
  );
}
