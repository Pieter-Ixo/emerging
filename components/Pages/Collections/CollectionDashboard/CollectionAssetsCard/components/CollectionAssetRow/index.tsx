import { IAssetColumnSorter, IEntityExtended } from "@/types/entityCollections";

import { useAppSelector } from "@/hooks/redux";
import { selectSelectedEntityExternalId } from "@/redux/entityCollections/selectors";
import { palette } from "@/theme/palette";

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
  const selectedEntityExternalId = useAppSelector(
    selectSelectedEntityExternalId
  );

  const rowStyle =
    selectedEntityExternalId === entity.externalId
      ? { backgroundColor: palette.Neutral200 }
      : {};

  return (
    <tr key={entity.id} onClick={selectAsset(entity)} style={rowStyle}>
      <TableCell isActive={activeFilters[0].isActive}>
        {entity.externalId}
      </TableCell>
      <TableCell isActive={activeFilters[1].isActive}>{0}</TableCell>
      <TableCell isActive={activeFilters[2].isActive}>{0}</TableCell>
    </tr>
  );
}
