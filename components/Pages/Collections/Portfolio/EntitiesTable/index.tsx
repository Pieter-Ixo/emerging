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
import BaseTable from "@/components/Presentational/BaseTable/BaseTable";
import transformPortfolioEntitiesToTableView from "@/helpers/transformData/transformPortfolioEntitiesToTableView";
import sortAssetsByAlsoKnownAs from "@/helpers/sorters/sortByAlsoKnownAs";
import sortObjectsBy from "@/helpers/collectionAsset/sortByAlsoExternalId";

type Props = {
  activeEntityCollection?: ICollectionEntities;
};

const defaultColumnHeadersState: IColumnHeader[] = [
  {
    name: "Asset",
    isActive: false,
    isSortable: true,
    cellField: "alsoKnownAs",
  },
  {
    name: "CARBON produced",
    isActive: false,
    isSortable: true,
    cellField: "produced",
  },
  {
    name: "CARBON claimable",
    isActive: false,
    isSortable: true,
    cellField: "totalTokenAmount",
  },
  {
    name: "CARBON offset",
    isActive: false,
    isSortable: true,
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
  const [selectedColumnHeaderIndex, setSelectedColumnHeaderIndex] = useState<
    number | undefined
  >();
  const [sortedEntities, setSortedEntities] = useState<IEntityExtended[]>([]);

  const tableEntities = activeEntityCollection?.entities;

  const selectedAssetExternalId = useAppSelector(
    selectSelectedEntityExternalId
  );

  function selectAsset(entity: IEntityExtended) {
    dispatch(setSelectedEntity(entity));
  }

  useEffect(() => {
    if (selectedColumnHeaderIndex !== undefined && sortedEntities.length) {
      switch (columnHeaders[selectedColumnHeaderIndex].name) {
        case "Asset":
          if (columnHeaders[selectedColumnHeaderIndex].isActive) {
            setSortedEntities((prevEntities) =>
              sortAssetsByAlsoKnownAs(prevEntities)
            );
            return;
          }
          if (tableEntities?.length) {
            setSortedEntities(tableEntities);
          }
          break;
        case "CARBON produced":
          if (columnHeaders[selectedColumnHeaderIndex].isActive) {
            setSortedEntities((prevEntities) =>
              sortObjectsBy(
                transformPortfolioEntitiesToTableView(prevEntities),
                "produced"
              )
            );
            return;
          }
          if (tableEntities?.length) {
            setSortedEntities(tableEntities);
          }
          break;
        case "CARBON claimable":
          if (columnHeaders[selectedColumnHeaderIndex].isActive) {
            setSortedEntities((prevEntities) =>
              sortObjectsBy(
                transformPortfolioEntitiesToTableView(prevEntities),
                "totalTokenAmount"
              )
            );
            return;
          }
          if (tableEntities?.length) {
            setSortedEntities(tableEntities);
          }
          break;
        case "CARBON offset":
          if (columnHeaders[selectedColumnHeaderIndex].isActive) {
            setSortedEntities((prevEntities) =>
              sortObjectsBy(
                transformPortfolioEntitiesToTableView(prevEntities),
                "retired"
              )
            );
            return;
          }
          if (tableEntities?.length) {
            setSortedEntities(tableEntities);
          }
          break;

        default:
          break;
      }
    }
  }, [columnHeaders]);

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

  if (
    Array.isArray(activeEntityCollection?.entities) &&
    activeEntityCollection?.entities.length === 0
  )
    return <Text>No Assets</Text>;

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

  if (!sortedEntities[0]?._adminToken?.CARBON) return null;

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
