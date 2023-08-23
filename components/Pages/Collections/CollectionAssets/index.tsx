import { useEffect, useState } from "react";

import {
  IAssetColumnSorter,
  IEntity,
  IEntityExtended,
} from "@/types/entityCollections";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setSelectedEntity } from "@/redux/entityCollections/slice";
import { selectSelectedEntityExternalId } from "@/redux/entityCollections/selectors";

import { sortAssetsByExternalId } from "@/helpers/collectionAsset/sortByAlsoExternalId";
import BaseTable from "@/components/Presentational/BaseTable/BaseTable";

const defaultColumnSorterState = [
  { name: "Serial number", isActive: false, cellField: "externalId" },
  { name: "CARBON claimable", isActive: false, cellField: "" },
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
  const [columnSorters, setActiveColumnSorters] = useState<
    IAssetColumnSorter[]
  >(defaultColumnSorterState);

  const [columnSorterIndex, setColumnSorterIndex] = useState<
    number | undefined
  >();

  const sortEntities = (clickedColumnIndex: number) => {
    setActiveColumnSorters((columns) =>
      columns.map((column, columnIndex) =>
        clickedColumnIndex === columnIndex
          ? { ...column, isActive: !column.isActive }
          : { ...column, isActive: false }
      )
    );
    setColumnSorterIndex(clickedColumnIndex);
  };

  useEffect(() => {
    if (columnSorterIndex !== undefined && sortedEntities.length)
      switch (columnSorters[columnSorterIndex].name) {
        case "Serial number":
          if (columnSorters[columnSorterIndex].isActive)
            setSortedEntities((assets) => sortAssetsByExternalId(assets));
          else
            setSortedEntities((assets) =>
              sortAssetsByExternalId(assets, false)
            );
          break;

        default:
          break;
      }
  }, [columnSorters]);

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
      columnSorters={columnSorters}
      onRowSelect={selectAsset}
      onSort={sortEntities}
    />
  );
}
