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

import { extendEntities } from "@/helpers/transformData/extendEntities";
import { resetSelectedEntity } from "@/redux/entityCollections/actions";
import { setSelectedEntity } from "@/redux/entityCollections/slice";
import sortObjectsBy from "@/helpers/sorters/sortObjectsBy";
import BaseTable from "@/components/Presentational/BaseTable";

const defaultColumnHeadersState: IColumnHeader[] = [
  {
    name: "Serial number",
    isSortable: true,
    sortOrder: "default",
    cellField: "externalId",
  },
  {
    name: "CARBON claimable",
    isSortable: true,
    sortOrder: "default",
    cellField: "_adminToken.CARBON.tokens.[0].amount",
  },
  {
    name: "CARBON Issued",
    isSortable: true,
    sortOrder: "default",
    cellField: "_adminToken.CARBON.tokens.[0].minted",
  },
  {
    name: "Asset creation date",
    cellField: "metadata.created",
  },
  {
    name: "Asset owner",
    cellField: "owner",
  },
  { name: "owned", cellField: "owned" },
];

export default function AssetsTable() {
  const dispatch = useAppDispatch();
  const collectionEntities = useAppSelector(selectAllEntities);
  const selectedEntity = useAppSelector(selectSelectedEntity);

  const [sortedEntities, setSortedEntities] = useState<IEntityExtended[]>([]);
  const [columnHeaders, setActiveColumnHeaders] = useState<IColumnHeader[]>(
    defaultColumnHeadersState
  );

  const sortEntities = (clickedColumnFieldName: string) => {
    const activeColumnHeader = columnHeaders.find(
      (header) => header.cellField === clickedColumnFieldName
    );
    if (activeColumnHeader?.sortOrder === "default") {
      setSortedEntities((prevEntities) => {
        const ascendingEntities = sortObjectsBy(
          prevEntities,
          clickedColumnFieldName
        );
        setActiveColumnHeaders((columns) =>
          columns.map((column) =>
            clickedColumnFieldName === column.cellField
              ? { ...column, sortOrder: "ascending" }
              : { ...column, sortOrder: "default" }
          )
        );
        return ascendingEntities;
      });
    }
    if (activeColumnHeader?.sortOrder === "ascending") {
      setSortedEntities((prevEntities) => {
        const descendingEntities = sortObjectsBy(
          prevEntities,
          clickedColumnFieldName,
          false
        );
        setActiveColumnHeaders((columns) =>
          columns.map((column) =>
            clickedColumnFieldName === column.cellField
              ? { ...column, sortOrder: "descending" }
              : { ...column, sortOrder: "default" }
          )
        );
        return descendingEntities;
      });
    }
    if (activeColumnHeader?.sortOrder === "descending") {
      setSortedEntities(() => {
        setActiveColumnHeaders((columns) =>
          columns.map((column) => ({ ...column, sortOrder: "default" }))
        );
        return collectionEntities;
      });
    }
  };

  useEffect(() => {
    dispatch(resetSelectedEntity());
    return () => {
      dispatch(resetSelectedEntity());
    };
  }, []);

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
