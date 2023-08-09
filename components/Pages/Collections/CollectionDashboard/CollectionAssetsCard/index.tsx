import { useEffect, useState } from "react";
import { ScrollArea, Table, Text } from "@mantine/core";

import { setSelectedEntity } from "@/redux/entityCollections/slice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { IEntity } from "@/types/entityCollections";
import { selectSelectedEntityExternalId } from "@/redux/entityCollections/selectors";

import ArrowRight from "../CollectionNewsCard/icons/arrowRight";
import PageBlock from "../PageBlock";
import CollectionAssetsHeadCell from "./components/CollectionAssetsHeadCell";
import CollectionAssetRowList from "./components/CollectionAssetRowList";
import { IAssetSortFilter } from "./types";

export default function CollectionAssetsCard() {
  const dispatch = useAppDispatch();

  const selectedAssetExternalId = useAppSelector(
    selectSelectedEntityExternalId
  );

  const [activeSortFilters, setActiveSortFilters] = useState<IAssetSortFilter[]>([
    { name: "Serial number", isActive: false },
    { name: "CARBON claimable", isActive: false },
    { name: "CARBON Issued", isActive: false },
  ]);

  const [assetSortFilterIndex, setAssetFilterIndex] = useState<
    number | undefined
  >();

  const selectAsset = (entity: IEntity) => () => {
    if (selectedAssetExternalId === entity.externalId)
      dispatch(setSelectedEntity(undefined));
    else {
      dispatch(setSelectedEntity(entity));
    }
  };

  const handleActiveSortFilter = (index: number) => {
    setActiveSortFilters((prevFilters) =>
      prevFilters.map((filter, filterIndex) =>
        filterIndex === index
          ? { ...filter, isActive: !filter.isActive }
          : { ...filter, isActive: false }
      )
    );
    setAssetFilterIndex(index);
  };

  useEffect(() => {
    dispatch(setSelectedEntity(undefined));
  }, []);

  return (
    <PageBlock
      title="ASSETS"
      rightSide={
        <Text>
          SEE ALL
          <ArrowRight pathFill="#000" />
        </Text>
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
                name={activeSortFilters[0].name}
                isFilterActive={activeSortFilters[0].isActive}
                onClick={() => handleActiveSortFilter(0)}
              />
              <CollectionAssetsHeadCell
                name={activeSortFilters[1].name}
                isFilterActive={activeSortFilters[1].isActive}
                onClick={() => handleActiveSortFilter(1)}
              />
              <CollectionAssetsHeadCell
                name={activeSortFilters[2].name}
                isFilterActive={activeSortFilters[2].isActive}
                onClick={() => handleActiveSortFilter(2)}
              />
            </tr>
          </thead>
          <tbody>
            <CollectionAssetRowList
              assetSortFilters={activeSortFilters}
              onAssetClick={selectAsset}
              sortFilterIndex={assetSortFilterIndex}
            />
          </tbody>
        </Table>
      </ScrollArea>
    </PageBlock>
  );
}
