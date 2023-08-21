import { Loader } from "@mantine/core";

import { IAssetColumnSorter, IEntityExtended } from "@/types/entityCollections";
import { useAppSelector } from "@/hooks/redux";
import {
  selectIsEntityCollectionsLoading,
} from "@/redux/entityCollections/selectors";

import CollectionAssetRow from "../CollectionAssetRow";

type Props = {
  sortedAssets: IEntityExtended[];
  assetFilters: IAssetColumnSorter[];
  onAssetClick: Function;
};

function CollectionAssetsTBody({
  assetFilters,
  onAssetClick,
  sortedAssets,
}: Props) {
  const isEntityCollectionsLoading = useAppSelector(
    selectIsEntityCollectionsLoading
  );

  if (isEntityCollectionsLoading)
    return (
      <tbody>
        <tr style={{ textAlign: "center" }}>
          <td colSpan={3}>
            <Loader />
          </td>
        </tr>
      </tbody>
    );

  return (
    <tbody>
      {sortedAssets?.map((entity) => (
        <CollectionAssetRow
          entity={entity}
          key={`row-${entity.externalId}`}
          activeFilters={assetFilters}
          selectAsset={onAssetClick}
        />
      ))}
    </tbody>
  );
}

export default CollectionAssetsTBody;
