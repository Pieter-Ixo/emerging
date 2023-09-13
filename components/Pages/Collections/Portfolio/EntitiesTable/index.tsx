import { useEffect, useState } from "react";
import { Text } from "@mantine/core";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setSelectedEntity } from "@/redux/entityCollections/slice";
import { fillEntitiesForUserCollections } from "@/redux/entityCollections/thunks";
import { selectSelectedEntityExternalId } from "@/redux/entityCollections/selectors";
import { resetSelectedEntity } from "@/redux/entityCollections/actions";
import {
  ICollectionEntities,
  IColumnHeader,
  IEntityExtended,
} from "@/types/entityCollections";
import sortObjectsBy from "@/helpers/sorters/sortObjectsBy";
import BaseTable from "@/components/Presentational/BaseTable";
import {
  transformPortfolioEntitiesToTableView,
  transformPortfolioEntitiesToTableSort,
} from "@/helpers/transformData/transformPortfolioEntitiesToTableView";

type Props = {
  activeEntityCollection?: ICollectionEntities;
};

const defaultColumnHeadersState: IColumnHeader[] = [
  {
    name: "Asset",
    isSortable: true,
    sortOrder: "default",
    cellField: "alsoKnownAs",
  },
  {
    name: "CARBON produced",
    isSortable: true,
    sortOrder: "default",
    cellField: "produced",
  },
  {
    name: "CARBON claimable",
    isSortable: true,
    sortOrder: "default",
    cellField: "totalTokenAmount",
  },
  {
    name: "CARBON offset",
    isSortable: true,
    sortOrder: "default",
    cellField: "retired",
  },
];

export default function PortfolioEntitiesTable({
  activeEntityCollection,
}: Props) {
  const dispatch = useAppDispatch();

  const [columnHeaders, setActiveColumnHeaders] = useState<IColumnHeader[]>(
    defaultColumnHeadersState
  );
  const [sortedEntities, setSortedEntities] = useState<IEntityExtended[]>([]);

  const tableEntities = activeEntityCollection?.entities;

  const selectedAssetExternalId = useAppSelector(
    selectSelectedEntityExternalId
  );

  function selectAsset(entity: IEntityExtended) {
    dispatch(setSelectedEntity(entity));
  }

  useEffect(() => {
    dispatch(resetSelectedEntity());
    return () => {
      dispatch(resetSelectedEntity());
    };
  }, []);

  useEffect(() => {
    const isEntitiesFilled = activeEntityCollection?.entities[0]?._profile;

    if (activeEntityCollection && !isEntitiesFilled) {
      dispatch(fillEntitiesForUserCollections(activeEntityCollection));
    }
  }, [activeEntityCollection]);

  useEffect(() => {
    if (tableEntities?.length && tableEntities !== sortedEntities) {
      setSortedEntities(tableEntities);
    }
  }, [tableEntities]);

  const sortEntities = (clickedColumnFieldName: string) => {
    const activeColumnHeader = columnHeaders.find(
      (header) => header.cellField === clickedColumnFieldName
    );
    if (activeColumnHeader?.sortOrder === "default") {
      setSortedEntities((prevEntities) => {
        const ascendingEntities = sortObjectsBy(
          transformPortfolioEntitiesToTableSort(prevEntities),
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
          transformPortfolioEntitiesToTableSort(prevEntities),
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
        return activeEntityCollection?.entities!;
      });
    }
  };

  if (!sortedEntities[0]?._adminToken?.CARBON) return null;
  if (
    Array.isArray(activeEntityCollection?.entities) &&
    activeEntityCollection?.entities.length === 0
  )
    return <Text>No Assets</Text>;

  return (
    <BaseTable<IEntityExtended>
      rows={transformPortfolioEntitiesToTableView(sortedEntities)}
      selectedRowId={selectedAssetExternalId}
      onRowSelect={(entity) => selectAsset(entity)}
      onSort={sortEntities}
      columnHeaders={columnHeaders}
    />
  );
}
