import { useEffect, useState } from "react";

import {
  IColumnHeader,
  IEntity,
  IEntityExtended,
} from "@/types/entityCollections";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectAllEntities,
  selectSelectedEntity,
} from "@/redux/entityCollections/selectors";

import { sortAssetsByExternalId } from "@/helpers/collectionAsset/sortByAlsoExternalId";
import BaseTable from "@/components/Presentational/BaseTable/BaseTable";
import { extendEntities } from "@/helpers/transformData/extendEntities";
import { resetSelectedEntity } from "@/redux/entityCollections/actions";
import { setSelectedEntity } from "@/redux/entityCollections/slice";

const defaultColumnHeadersState: IColumnHeader[] = [
  {
    name: "Serial number",
    isSortable: true,
    isActive: false,
    cellField: "externalId",
  },
  {
    name: "CARBON claimable",
    isActive: false,
    cellField: "_adminToken.CARBON.tokens.[0].amount",
  },
  {
    name: "CARBON Issued",
    isActive: false,
    cellField: "_adminToken.CARBON.tokens.[0].minted",
  },
  {
    name: "Asset creation date",
    isActive: false,
    cellField: "metadata.created",
  },
  { name: "Asset owner", isActive: false, cellField: "owner" },
  { name: "owned", isActive: false, cellField: "owned" },
];

export default function AssetsTable() {
  const dispatch = useAppDispatch();
  const collectionEntities = useAppSelector(selectAllEntities);
  const selectedEntity = useAppSelector(selectSelectedEntity);

  const [sortedEntities, setSortedEntities] = useState<IEntityExtended[]>([]);
  const [columnHeaders, setActiveColumnHeaders] = useState<IColumnHeader[]>(
    defaultColumnHeadersState
  );

  const [selectedColumnHeaderIndex, setSelectedColumnHeaderIndex] = useState<
    number | undefined
  >();

  const sortEntities = (clickedColumnIndex: number) => {
    setActiveColumnHeaders((columns) =>
      columns.map((column, columnIndex) =>
        clickedColumnIndex === columnIndex
          ? { ...column, isActive: !column.isActive }
          : { ...column, isActive: false }
      )
    );
    setSelectedColumnHeaderIndex(clickedColumnIndex);
  };

  useEffect(() => {
    dispatch(resetSelectedEntity());
    return () => {
      dispatch(resetSelectedEntity());
    };
  }, []);

  useEffect(() => {
    if (selectedColumnHeaderIndex !== undefined && sortedEntities.length)
      switch (columnHeaders[selectedColumnHeaderIndex].name) {
        case "Serial number":
          if (columnHeaders[selectedColumnHeaderIndex].isActive)
            setSortedEntities((assets) => sortAssetsByExternalId(assets));
          else
            setSortedEntities((assets) =>
              sortAssetsByExternalId(assets, false)
            );
          break;

        default:
          break;
      }
  }, [columnHeaders]);

  useEffect(() => {
    if (Array.isArray(collectionEntities)) {
      setSortedEntities(collectionEntities);
    }
  }, [collectionEntities]);

  const selectAsset = (entity: IEntity) => {
    dispatch(setSelectedEntity(entity));
  };

  return (
    <BaseTable<IEntityExtended>
      rows={extendEntities(sortedEntities)}
      selectedRowId={selectedEntity?.id}
      columnHeaders={columnHeaders}
      onRowSelect={selectAsset}
      onSort={sortEntities}
    />
  );
}
