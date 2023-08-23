import { useEffect, useState } from "react";
import Link from "next/link";
import { Flex, ScrollArea, Text } from "@mantine/core";

import { setSelectedEntity } from "@/redux/entityCollections/slice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  IAssetColumnSorter,
  IEntity,
  IEntityExtended,
} from "@/types/entityCollections";
import { selectSelectedEntityExternalId } from "@/redux/entityCollections/selectors";
import { sortAssetsByExternalId } from "@/helpers/collectionAsset/sortByAlsoExternalId";
import { palette } from "@/theme/palette";
import useValueFromRouter from "@/utils/useValueFromRouter";
import ArrowRightIcon from "@/assets/icons/arrow-right.svg";
import BaseIcon from "@/components/Presentational/BaseIcon";
import BaseTable from "@/components/Presentational/BaseTable/BaseTable";

import PageBlock from "../PageBlock";
import CollectionAssetModal from "./components/CollectionAssetModal";

const defaultColumnSorterState: IAssetColumnSorter[] = [
  { name: "Serial number", isActive: false, cellField: "externalId" },
  { name: "CARBON claimable", isActive: false, cellField: undefined },
  { name: "CARBON Issued", isActive: false, cellField: undefined },
];

export default function CollectionAssetsCard() {
  const dispatch = useAppDispatch();
  const collectionId = useValueFromRouter("collectionId");

  const selectedAssetExternalId = useAppSelector(
    selectSelectedEntityExternalId
  );
  // TODO: make a redux selector
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

  const selectAsset = (entity: IEntity) => () => {
    if (selectedAssetExternalId === entity.externalId)
      dispatch(setSelectedEntity(undefined));
    else {
      dispatch(setSelectedEntity(entity));
    }
  };

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
    dispatch(setSelectedEntity(undefined));
    return () => {
      dispatch(setSelectedEntity(undefined));
    };
  }, []);

  useEffect(() => {
    if (Array.isArray(collectionEntities)) {
      setSortedEntities(collectionEntities);
    }
  }, [collectionEntities]);

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
            <BaseIcon width={24} height={25} isPointer Icon={ArrowRightIcon} />
          </Flex>
        </Link>
      }
    >
      <ScrollArea h={425} type="scroll">
        <BaseTable
          rows={sortedEntities}
          onRowSelect={selectAsset}
          onSort={sortEntities}
          columnSorters={columnSorters}
        />
      </ScrollArea>
      <CollectionAssetModal />
    </PageBlock>
  );
}
