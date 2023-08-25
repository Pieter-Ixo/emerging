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
import extendEntities from "@/helpers/transformData/extendEntities";

const defaultColumnHeadersState = [
  { name: "Serial number", isActive: false, cellField: "externalId" },
  {
    name: "CARBON claimable",
    isActive: false,
    cellField:
      "_adminToken.CARBON.tokens.did:ixo:entity:7f0cc7a072d514b38cb90bdf2e215901.amount",
  },
  {
    name: "CARBON Issued",
    isActive: false,
    cellField:
      "_adminToken.CARBON.tokens.did:ixo:entity:7f0cc7a072d514b38cb90bdf2e215901.minted",
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
      rows={extendEntities(sortedEntities)}
      columnHeaders={columnHeaders}
      onRowSelect={selectAsset}
      onSort={sortEntities}
    />
  );
}
