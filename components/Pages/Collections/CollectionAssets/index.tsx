import { Table } from "@mantine/core";
import React, { useEffect, useState } from "react";

import { IAssetColumnSorter, IEntity, IEntityExtended } from "@/types/entityCollections";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setSelectedEntity } from "@/redux/entityCollections/slice";
import { selectSelectedEntityExternalId } from "@/redux/entityCollections/selectors";

import { sortAssetsByExternalId } from "@/helpers/collectionAsset/sortByAlsoExternalId";
import AssetsTableHeadCell from "./components/AssetsTableHead";
import AssetsTBody from "./components/AssetsTBody";

const defaultColumnSorterState = [
  { name: "Serial number", isActive: false },
  { name: "CARBON claimable", isActive: false },
  { name: "CARBON Issued", isActive: false },
  { name: "Asset creation date", isActive: false },
  { name: "Asset owner", isActive: false },
  { name: "owned", isActive: false },
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

  function handleColumnClick(clickedColumnIndex: number) {
    setActiveColumnSorters((columns) =>
      columns.map((column, columnIndex) =>
        clickedColumnIndex === columnIndex
          ? { ...column, isActive: !column.isActive }
          : { ...column, isActive: false }
      )
    );
    setColumnSorterIndex(clickedColumnIndex);
  }

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

  const selectAsset = (entity: IEntity) => () => {
    if (selectedAssetExternalId === entity.externalId)
      dispatch(setSelectedEntity(undefined));
    else {
      dispatch(setSelectedEntity(entity));
    }
  };

  return (
    <Table
      highlightOnHover
      style={{
        alignSelf: "stretch",
      }}
    >
      <thead>
        <tr>
          {columnSorters.map((column, i) => (
            <AssetsTableHeadCell
              name={column.name}
              key={column.name}
              isColumnActive={column.isActive}
              onClick={() => handleColumnClick(i)}
            />
          ))}
        </tr>
      </thead>
      <AssetsTBody
        assetFilters={columnSorters}
        onAssetClick={selectAsset}
        sortedEntities={sortedEntities}
      />
    </Table>
  );
}
