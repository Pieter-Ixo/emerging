import { IAssetColumnSorter, IEntityExtended } from "@/types/entityCollections";
import BaseIcon from "@/components/Presentational/BaseIcon";
import StarIcon from "@/assets/icons/star.svg";

import { palette } from "@/theme/palette";
import AssetsTableCell from "../AssetsTableCell";

type Props = {
  entity: IEntityExtended;
  activeFilters: IAssetColumnSorter[];
  selectAsset: any;
};

export default function AssetsTableRow({
  entity,
  activeFilters,
  selectAsset,
}: Props) {
  return (
    <tr key={entity.id} onClick={selectAsset(entity)}>
      <AssetsTableCell isActive={activeFilters[0].isActive}>
        #{entity.externalId}
      </AssetsTableCell>
      <AssetsTableCell isActive={activeFilters[1].isActive}>
        {0}
      </AssetsTableCell>
      <AssetsTableCell isActive={activeFilters[2].isActive}>
        {0}
      </AssetsTableCell>
      <AssetsTableCell isActive={activeFilters[3].isActive}>
        19 Oct 22
      </AssetsTableCell>
      <AssetsTableCell isActive={activeFilters[4].isActive}>
        ixo12345...12311
      </AssetsTableCell>
      <AssetsTableCell isActive={activeFilters[5].isActive}>
        <BaseIcon
          width={20}
          fill={palette.fullBlue}
          height={20}
          Icon={StarIcon}
        />
      </AssetsTableCell>
    </tr>
  );
}
