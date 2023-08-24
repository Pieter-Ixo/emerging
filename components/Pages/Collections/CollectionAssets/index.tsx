import { useEffect, useState } from "react";

import {
  IColumnHeader,
  IEntity,
  IEntityExtended,
} from "@/types/entityCollections";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setSelectedEntity } from "@/redux/entityCollections/slice";
import { selectSelectedEntityExternalId } from "@/redux/entityCollections/selectors";

import { sortAssetsByExternalId } from "@/helpers/collectionAsset/sortByAlsoExternalId";
import BaseTable from "@/components/Presentational/BaseTable/BaseTable";

const defaultColumnHeadersState = [
  { name: "Serial number", isActive: false, cellField: "externalId" },
  { name: "CARBON claimable", isActive: false, cellField: undefined },
  { name: "CARBON Issued", isActive: false, cellField: undefined },
  { name: "Asset creation date", isActive: false, cellField: undefined },
  { name: "Asset owner", isActive: false, cellField: undefined },
  { name: "owned", isActive: false, cellField: undefined },
];

export default function AssetsTable() {
  const dispatch = useAppDispatch();
  const selectedAssetExternalId = useAppSelector(
    selectSelectedEntityExternalId
  );
  const collectionEntities = useAppSelector(
    (state) => state.entityCollection.entityCollections[0]?.entities
  );
  const [sortedEntities, setSortedEntities] = useState<IEntityExtended[]>([]);
  const [columnHeaders, setActiveColumnHeaders] = useState<IColumnHeader[]>(
    defaultColumnHeadersState
  );

  const [columnHeaderIndex, setColumnHeaderIndex] = useState<
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
    setColumnHeaderIndex(clickedColumnIndex);
  };

  useEffect(() => {
    if (columnHeaderIndex !== undefined && sortedEntities.length)
      switch (columnHeaders[columnHeaderIndex].name) {
        case "Serial number":
          if (columnHeaders[columnHeaderIndex].isActive)
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
    if (selectedAssetExternalId === entity.externalId)
      dispatch(setSelectedEntity(undefined));
    else {
      dispatch(setSelectedEntity(entity));
    }
  };

  return (
    <BaseTable
      rows={sortedEntities}
      columnHeaders={columnHeaders}
      onRowSelect={selectAsset}
      onSort={sortEntities}
    />
  );
}
