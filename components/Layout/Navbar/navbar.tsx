import { useEffect, useRef } from "react";
import Link from "next/link";
import { Box, Flex, Navbar } from "@mantine/core";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { palette } from "@/theme/palette";
import {
  selectSelectedEntity,
  selectUserEntityCollections,
} from "@/redux/entityCollections/selectors";
import { fillEntitiesForUserCollections } from "@/redux/entityCollections/thunks";
import { resetSelectedEntity } from "@/redux/entityCollections/actions";
import ImpactCreditsCard from "@/components/Containers/UserBalance/ImpactCreditsCard";
import ConnectAccountButton from "@/components/Containers/ConnectAccountButton/connected_account";
import NavBatchesCard from "@/components/Containers/UserBalance/BatchesCard";

import BaseIcon from "@/components/Presentational/BaseIcon";
import IxoLogoIcon from "@/assets/icons/ixo-logo.svg";

export default function Nav() {
  const dispatch = useAppDispatch();
  const userAddress = useAppSelector((state) => state.user.connectedWallet);
  const userEntityCollections = useAppSelector(selectUserEntityCollections);
  const selectedEntity = useAppSelector(selectSelectedEntity);
  const isUserCollectionsFilled = useRef(false);

  useEffect(() => {
    dispatch(resetSelectedEntity());
    return () => {
      dispatch(resetSelectedEntity());
    };
  }, []);

  useEffect(() => {
    if (userAddress && !isUserCollectionsFilled.current) {
      userEntityCollections.forEach((userEntityCollection) => {
        dispatch(fillEntitiesForUserCollections(userEntityCollection));
      });
      isUserCollectionsFilled.current = true;
    }
  }, [userAddress]);

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
            <BaseIcon
              cursorMode="pointer"
              width={100}
              height={59}
              Icon={IxoLogoIcon}
            />
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
          <NavBatchesCard entity={selectedEntity} />
        </Navbar.Section>
      )}
    </Navbar>
  );
}
