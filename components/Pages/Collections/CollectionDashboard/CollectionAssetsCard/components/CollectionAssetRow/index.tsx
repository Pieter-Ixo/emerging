import { IAssetColumnSorter, IEntityExtended } from "@/types/entityCollections";

import TableCell from "../TableCell";

type Props = {
  selectAsset: Function;
  entity: IEntityExtended;
  activeFilters: IAssetColumnSorter[];
};

export default function CollectionAssetRow({
  selectAsset,
  entity,
  activeFilters,
}: Props) {

  return (
    <tr key={entity.id} onClick={selectAsset(entity)}>
      <TableCell isActive={activeFilters[0].isActive}>
        {entity.externalId}
      </TableCell>
      <TableCell isActive={activeFilters[1].isActive}>{0}</TableCell>
      <TableCell isActive={activeFilters[2].isActive}>{0}</TableCell>
    </tr>
  );
}
