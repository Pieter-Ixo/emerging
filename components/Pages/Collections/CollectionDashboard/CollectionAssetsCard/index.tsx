import { useEffect, useState } from "react";
import Link from "next/link";
import { Flex, ScrollArea, Table, Text } from "@mantine/core";

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
import ArrowRightIcon from "@/components/Icons/ArrowRightIcon";

import PageBlock from "../PageBlock";
import CollectionAssetsHeadCell from "./components/CollectionAssetsHeadCell";
import CollectionAssetsTBody from "./components/CollectionAssetsTBody";
import CollectionAssetModal from "./components/CollectionAssetModal";

const defaultColumnSorterState = [
  { name: "Serial number", isActive: false },
  { name: "CARBON claimable", isActive: false },
  { name: "CARBON Issued", isActive: false },
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
            <ArrowRightIcon />
          </Flex>
        </Link>
      }
    >
      <ScrollArea h={425} type="scroll">
        <Table
          highlightOnHover
          style={{
            alignSelf: "stretch",
            width: 390,
          }}
        >
          <thead>
            <tr>
              <CollectionAssetsHeadCell
                name={columnSorters[0].name}
                isColumnActive={columnSorters[0].isActive}
                onClick={() => handleColumnClick(0)}
              />
              <CollectionAssetsHeadCell
                name={columnSorters[1].name}
                isColumnActive={columnSorters[1].isActive}
                onClick={() => handleColumnClick(1)}
              />
              <CollectionAssetsHeadCell
                name={columnSorters[2].name}
                isColumnActive={columnSorters[2].isActive}
                onClick={() => handleColumnClick(2)}
              />
            </tr>
          </thead>
          <CollectionAssetsTBody
            assetFilters={columnSorters}
            onAssetClick={selectAsset}
            sortedAssets={sortedEntities}
          />
        </Table>
      </ScrollArea>
      <CollectionAssetModal />
    </PageBlock>
  );
}
