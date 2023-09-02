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
import { sortAssetsByExternalId } from "@/helpers/collectionAsset/sortByAlsoExternalId";
import { palette } from "@/theme/palette";
import useValueFromRouter from "@/utils/useValueFromRouter";
import ArrowRightIcon from "@/assets/icons/arrow-right.svg";
import BaseIcon from "@/components/Presentational/BaseIcon";
import BaseTable from "@/components/Presentational/BaseTable/BaseTable";

import PageBlock from "../PageBlock";
import CollectionAssetModal from "./components/CollectionAssetModal";

const defaultColumnHeadersState: IColumnHeader[] = [
  {
    name: "Serial number",
    isActive: false,
    isSortable: true,
    cellField: "externalId",
  },
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
    dispatch(setSelectedEntity(undefined));
    return () => {
      dispatch(setSelectedEntity(undefined));
    };
  }, []);

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
