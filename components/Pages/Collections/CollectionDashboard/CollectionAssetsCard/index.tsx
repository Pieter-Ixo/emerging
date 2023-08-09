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
import { IAssetFilter } from "./types";

export default function CollectionAssetsCard() {
  const dispatch = useAppDispatch();

  const selectedAssetExternalId = useAppSelector(
    selectSelectedEntityExternalId
  );

  const [activeFilters, setActiveFilters] = useState<IAssetFilter[]>([
    { name: "Serial number", isActive: false },
    { name: "CARBON claimable", isActive: false },
    { name: "CARBON Issued", isActive: false },
  ]);

  const [assetFilterIndex, setAssetFilterIndex] = useState<
    number | undefined
  >();

  const selectAsset = (entity: IEntity) => () => {
    if (selectedAssetExternalId === entity.externalId)
      dispatch(setSelectedEntity(undefined));
    else {
      dispatch(setSelectedEntity(entity));
    }
  };

  const handleFilterActive = (index: number) => {
    setActiveFilters((prevFilters) =>
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
                name={activeFilters[0].name}
                isFilterActive={activeFilters[0].isActive}
                onClick={() => handleFilterActive(0)}
              />
              <CollectionAssetsHeadCell
                name={activeFilters[1].name}
                isFilterActive={activeFilters[1].isActive}
                onClick={() => handleFilterActive(1)}
              />
              <CollectionAssetsHeadCell
                name={activeFilters[2].name}
                isFilterActive={activeFilters[2].isActive}
                onClick={() => handleFilterActive(2)}
              />
            </tr>
          </thead>
          <tbody>
            <CollectionAssetRowList
              assetFilters={activeFilters}
              onAssetClick={selectAsset}
              filterIndex={assetFilterIndex}
            />
          </tbody>
        </Table>
      </ScrollArea>
    </PageBlock>
  );
}
