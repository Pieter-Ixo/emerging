import { Table } from "@mantine/core";
import React, { useEffect, useState } from "react";

import { IEntity, IEntityExtended } from "@/types/entityCollections";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setSelectedEntity } from "@/redux/entityCollections/slice";
import { selectSelectedEntityExternalId } from "@/redux/entityCollections/selectors";

import { sortAssetsByAlsoKnownAs } from "@/helpers/collectionAsset/sortByAlsoKnownAs";
import AssetsTableHeadCell from "./components/AssetsTableHead";
import AssetsTBody from "./components/AssetsTBody";
import { IAssetColumnSorter } from "../CollectionDashboard/CollectionAssetsCard/types";

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
            setSortedEntities((assets) => sortAssetsByAlsoKnownAs(assets));
          else
            setSortedEntities((assets) =>
              sortAssetsByAlsoKnownAs(assets, false)
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
          <AssetsTableHeadCell
            name={columnSorters[0].name}
            isColumnActive={columnSorters[0].isActive}
            onClick={() => handleColumnClick(0)}
          />
          <AssetsTableHeadCell
            name={columnSorters[1].name}
            isColumnActive={columnSorters[1].isActive}
            onClick={() => handleColumnClick(1)}
          />
          <AssetsTableHeadCell
            name={columnSorters[2].name}
            isColumnActive={columnSorters[2].isActive}
            onClick={() => handleColumnClick(2)}
          />
          <AssetsTableHeadCell
            name={columnSorters[3].name}
            isColumnActive={columnSorters[3].isActive}
            onClick={() => handleColumnClick(3)}
          />
          <AssetsTableHeadCell
            name={columnSorters[4].name}
            isColumnActive={columnSorters[4].isActive}
            onClick={() => handleColumnClick(4)}
          />
          <AssetsTableHeadCell
            name={columnSorters[5].name}
            isColumnActive={columnSorters[5].isActive}
            onClick={() => handleColumnClick(5)}
          />
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
