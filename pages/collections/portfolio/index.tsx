import { useContext, useEffect } from "react";
import { Loader } from "@mantine/core";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchCollectionsByOwnerAddres } from "@/redux/entityCollections/thunks";
import {
  selectIsEntityCollectionsLoading,
  selectUserEntityCollection,
} from "@/redux/entityCollections/selectors";
import { WalletContext } from "@/context/wallet";

import CollectionsLayout from "../components/Layout";
import Header from "./components/Header";

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

  return (
    <CollectionsLayout>
      <Header />
      <p>my portfolio Collections</p>
      {isLoading && <Loader />}
      {userEntityCollections && (
        <ul>
          Collections:
          {userEntityCollections.map(({ collection, entities }) => (
            <li key={collection.alsoKnownAs}>
              <p>
                <b>Collection Name: {collection._profile?.brand}</b>
              </p>
              <p>Entities:</p>
              <ul>
                {entities &&
                  entities.map((entity, i) => (
                    <li key={entity.externalId}>
                      {i}. {entity.externalId}
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </CollectionsLayout>
  );
}
