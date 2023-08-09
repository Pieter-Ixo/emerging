import { useEffect, useState } from "react";
import { Loader } from "@mantine/core";

import { IEntityExtended } from "@/types/entityCollections";
import { useAppSelector } from "@/hooks/redux";
import {
  selectIsEntityCollectionsLoading,
  selectSelectedEntityExternalId,
} from "@/redux/entityCollections/selectors";

import CollectionAssetRow from "../CollectionAssetRow";
import { IAssetFilter } from "../../types";

type Props = {
  assetFilters: IAssetFilter[];
  filterIndex?: number;
  onAssetClick: Function;
};

function CollectionAssetRowList({
  assetFilters,
  onAssetClick,
  filterIndex,
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
    // TODO: fill with claimable and issued data, after adding new ways of sorting according to the arrived values
    // TODO: when data arrives remove the else block and simply resort the entity array
    if (filterIndex !== undefined)
      switch (assetFilters[filterIndex].name) {
        case "Serial number":
          if (assetFilters[filterIndex].isActive)
            setEntitiesData((prevData) =>
              prevData
                ?.slice()
                .sort(
                  (a, b) =>
                    parseInt(a.alsoKnownAs.split(`#`)[1], 10) -
                    parseInt(b.alsoKnownAs.split(`#`)[1], 10)
                )
            );
          else
            setEntitiesData((prevData) =>
              prevData
                ?.slice()
                .sort(
                  (a, b) =>
                    parseInt(b.alsoKnownAs.split(`#`)[1], 10) -
                    parseInt(a.alsoKnownAs.split(`#`)[1], 10)
                )
            );
          break;

        default:
          break;
      }
  }, [assetFilters]);

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
          activeFilters={assetFilters}
          isAssetRowActive={selectedAssetExternalId === entity.externalId}
          selectAsset={onAssetClick}
        />
      ))}
    </>
  );
}

export default CollectionAssetRowList;
