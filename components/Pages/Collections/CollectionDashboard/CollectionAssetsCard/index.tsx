import { useEffect, useState } from "react";
import Link from "next/link";
import { Flex, ScrollArea, Text } from "@mantine/core";

import { setSelectedEntity } from "@/redux/entityCollections/slice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  IColumnHeader,
  IEntity,
  IEntityExtended,
} from "@/types/entityCollections";
import {
  selectAllEntities,
  selectSelectedEntity,
} from "@/redux/entityCollections/selectors";
import sortObjectsBy from "@/helpers/sorters/sortObjectsBy";
import { palette } from "@/theme/palette";
import useValueFromRouter from "@/utils/useValueFromRouter";
import ArrowRightIcon from "@/assets/icons/arrow-right.svg";
import BaseIcon from "@/components/Presentational/BaseIcon";
import BaseTable from "@/components/Presentational/BaseTable";

import PageBlock from "../PageBlock";
import CollectionAssetModal from "./components/CollectionAssetModal";

const defaultColumnHeadersState: IColumnHeader[] = [
  {
    name: "Serial number",
    isSortable: true,
    sortOrder: "default",
    cellField: "externalId",
  },
  {
    name: "CARBON claimable",
    sortOrder: "default",
    isSortable: true,
    cellField: "_adminToken.CARBON.tokens.[0].amount",
  },
  {
    name: "CARBON Issued",
    sortOrder: "default",
    isSortable: true,
    cellField: "_adminToken.CARBON.tokens.[0].minted",
  },
];

export default function CollectionAssetsCard() {
  const dispatch = useAppDispatch();
  const collectionId = useValueFromRouter("collectionId");

  const selectedEntity = useAppSelector(selectSelectedEntity);

  const collectionEntities = useAppSelector(selectAllEntities);

  const [sortedEntities, setSortedEntities] = useState<IEntityExtended[]>([]);
  const [columnHeaders, setActiveColumnHeaders] = useState<IColumnHeader[]>(
    defaultColumnHeadersState
  );

  useEffect(() => {
    dispatch(setSelectedEntity(undefined));
    return () => {
      dispatch(setSelectedEntity(undefined));
    };
  }, []);

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
    if (Array.isArray(collectionEntities)) {
      setSortedEntities(collectionEntities);
    }
  }, [collectionEntities]);

  const selectAsset = (entity: IEntity) => {
    dispatch(setSelectedEntity(entity));
  };

  return (
    <PageBlock
      title="ASSETS"
      rightSide={
        <Link
          href={`/collections/${collectionId}/assets`}
          color={palette.Black}
        >
          <Flex>
            <Text size="md">SEE ALL</Text>
            <BaseIcon
              width={24}
              height={25}
              cursorMode="pointer"
              Icon={ArrowRightIcon}
            />
          </Flex>
        </Link>
      }
    >
      <ScrollArea h={425} type="scroll">
        <BaseTable<IEntityExtended>
          rows={sortedEntities}
          onRowSelect={selectAsset}
          selectedRowId={selectedEntity?.id}
          onSort={sortEntities}
          columnHeaders={columnHeaders}
        />
      </ScrollArea>
      <CollectionAssetModal />
    </PageBlock>
  );
}
