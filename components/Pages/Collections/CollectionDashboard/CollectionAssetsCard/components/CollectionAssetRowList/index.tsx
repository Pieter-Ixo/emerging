import { useEffect, useState } from "react";
import { Loader } from "@mantine/core";

import { IEntityExtended } from "@/types/entityCollections";
import { useAppSelector } from "@/hooks/redux";
import {
  selectIsEntityCollectionsLoading,
  selectSelectedEntityExternalId,
} from "@/redux/entityCollections/selectors";
import {
  sortByAlsoKnownAsAscending,
  sortByAlsoKnownAsDescending,
} from "@/helpers/collectionAsset/sortByAlsoKnownAs";

import CollectionAssetRow from "../CollectionAssetRow";
import { IAssetSortFilter } from "../../types";

type Props = {
  assetSortFilters: IAssetSortFilter[];
  sortFilterIndex?: number;
  onAssetClick: Function;
};

function CollectionAssetRowList({
  assetSortFilters,
  onAssetClick,
  sortFilterIndex,
}: Props) {
  const entities = useAppSelector(
    (state) => state.entityCollection.entityCollections[0]?.entities
  );

  const [entitiesData, setEntitiesData] = useState<IEntityExtended[]>([]);

  const selectedAssetExternalId = useAppSelector(
    selectSelectedEntityExternalId
  );
  const isEntityCollectionsLoading = useAppSelector(
    selectIsEntityCollectionsLoading
  );

  useEffect(() => {
    if (Array.isArray(entities)) {
      setEntitiesData(entities);
    }
  }, [entities]);

  useEffect(() => {
    // FIXME: EMERGING-127 fill with claimable and issued data, after adding new ways of sorting according to the arrived values
    // TODO: when data arrives remove the else block and simply resort the entity array
    if (sortFilterIndex !== undefined && entitiesData.length)
      switch (assetSortFilters[sortFilterIndex].name) {
        case "Serial number":
          if (assetSortFilters[sortFilterIndex].isActive)
            setEntitiesData((prevData) => sortByAlsoKnownAsAscending(prevData));
          else
            setEntitiesData((prevData) =>
              sortByAlsoKnownAsDescending(prevData)
            );
          break;

        default:
          break;
      }
  }, [assetSortFilters]);

  if (isEntityCollectionsLoading)
    return (
      <tr style={{ textAlign: "center" }}>
        <td colSpan={3}>
          <Loader />
        </td>
      </tr>
    );

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {entitiesData?.map((entity) => (
        <CollectionAssetRow
          entity={entity}
          key={`row-${entity.externalId}`}
          activeFilters={assetSortFilters}
          isAssetRowActive={selectedAssetExternalId === entity.externalId}
          selectAsset={onAssetClick}
        />
      ))}
    </>
  );
}

export default CollectionAssetRowList;
