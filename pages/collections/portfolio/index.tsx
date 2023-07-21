import { useContext, useEffect } from "react";
import { Box, Container, Loader, Text } from "@mantine/core";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  fetchCollectionsByOwnerAddres,
  fillEntitiesForUserCollections,
} from "@/redux/entityCollections/thunks";
import {
  selectIsEntityCollectionsLoading,
  selectUserEntityCollection,
} from "@/redux/entityCollections/selectors";
import { WalletContext } from "@/context/wallet";
import { ICollectionEntities } from "@/types/entityCollections";

import { palette } from "@/theme/palette";
import CollectionsLayout from "../components/Layout";
import Header from "./components/Header";
import CollectionsList from "./components/CollectionsList";

export default function Collections() {
  const dispatch = useAppDispatch();
  const userEntityCollections = useAppSelector(selectUserEntityCollection);
  const isLoading = useAppSelector(selectIsEntityCollectionsLoading);
  const { wallet } = useContext(WalletContext);
  const userAddress =
    wallet.user?.address || "ixo1xwn45d6xhe3egcz3nqlfc2elpc3h6usy6yw3uk";

  useEffect(() => {
    if (userAddress) {
      dispatch(fetchCollectionsByOwnerAddres(userAddress));
    }
  }, [dispatch, userAddress]);

  // TODO: Call fillEntities when card got selected (not sure)

  function fillEntities(entityCollection: ICollectionEntities) {
    dispatch(fillEntitiesForUserCollections(entityCollection));
  }

  const isLoaderVisible = isLoading && <Loader />;

  return (
    <CollectionsLayout>
      <Header />
      <Container
        fluid
        bg="white"
        py="xl"
        px={0}
        mx={0}
        sx={{
          borderRadius: 16,
        }}
      >
        <Box mx="xl" sx={{ borderBottom: `1px solid ${palette.Black}` }}>
          <Text>MY ASSETS</Text>
        </Box>
        {isLoaderVisible}
        {userEntityCollections && (
          <CollectionsList userEntityCollections={userEntityCollections} />
        )}
      </Container>
    </CollectionsLayout>
  );
}
