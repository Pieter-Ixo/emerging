import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Box, Flex, Navbar } from "@mantine/core";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { palette } from "@/theme/palette";
import {
  selectSelectedEntity,
  selectUserEntityCollections,
  selectUserEntityCollectionsIds,
} from "@/redux/entityCollections/selectors";
import { fillEntitiesForUserCollections } from "@/redux/entityCollections/thunks";
import isStringArraysEqual from "@/utils/isStringArraysEqual";

import ConnectAccountButton from "../connectedAccount/connected_account";
import ImpactCreditsCard from "../userBalance/ImpactCreditsCard";
import HeaderLogo from "../Header_Logo/Index";
import BatchesCard from "../userBalance/BatchesCard";

export default function Nav() {
  const dispatch = useAppDispatch();
  const userAddress = useAppSelector((state) => state.user.connectedWallet);
  const userEntityCollections = useAppSelector(selectUserEntityCollections);
  const selectedEntity = useAppSelector(selectSelectedEntity);
  // const userEntityCollectionsIds = useAppSelector(
  //   selectUserEntityCollectionsIds
  // );
  const isUserCollectionsFilled = useRef(false);
  // const [idsList, setIdsList] = useState<string[]>([]);

  useEffect(() => {
    if (userAddress && !isUserCollectionsFilled.current) {
      userEntityCollections.forEach((userEntityCollection) => {
        dispatch(fillEntitiesForUserCollections(userEntityCollection));
      });
      isUserCollectionsFilled.current = true;
      console.log("Got into smthg");
    }
  }, [userAddress]);

  useEffect(() => {
    console.log("userEntityCollections: ", userEntityCollections);
  });
  // useEffect(() => {
  //   if (
  //     // if userCollections are, and have changed
  //     userEntityCollectionsIds.length &&
  //     !isStringArraysEqual(idsList, userEntityCollectionsIds)
  //   ) {
  //     setIdsList(userEntityCollectionsIds);

  //     userEntityCollections.forEach((userEntityCollection) => {
  //       dispatch(fillEntitiesForUserCollections(userEntityCollection));
  //     });
  //   }
  // }, [userEntityCollectionsIds]);

  return (
    <Navbar
      p="xs"
      width={{ base: 360, sm: 360 }}
      h="100%"
      mih="100vh"
      fixed
      sx={{ overflowY: "scroll" }}
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
      {selectedEntity && (
        <Navbar.Section p="xs">
          <BatchesCard entity={selectedEntity} />
        </Navbar.Section>
      )}
    </Navbar>
  );
}
