import { IAssetColumnSorter, IEntityExtended } from "@/types/entityCollections";

import AssetsTableRow from "../AssetsTableRow";

type Props = {
  sortedEntities: IEntityExtended[] | undefined;
  assetFilters: IAssetColumnSorter[];
  onAssetClick: Function;
};

export default function AssetsTBody({
  sortedEntities,
  assetFilters,
  onAssetClick,
}: Props) {
  return (
    <tbody>
      {sortedEntities?.map((entity) => (
        <AssetsTableRow
          entity={entity}
          key={`row-${entity.externalId}`}
          activeFilters={assetFilters}
          selectAsset={onAssetClick}
        />
      ))}
    </tbody>
  );
}
