import { Suspense, useEffect, useState } from "react";
import { ScrollArea, Table, Text } from "@mantine/core";

import { setSelectedEntity } from "@/redux/entityCollections/slice";
import { selectSelectedAssetExternalId } from "@/redux/entityCollections/selectors";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { IEntity, IEntityExtended } from "@/types/entityCollections";

import ArrowRight from "../CollectionNewsCard/icons/arrowRight";
import Loading from "./loading";
import PageBlock from "../PageBlock";
import CollectionAssetRow from "./components/CollectionAssetRow";
import CollectionAssetsHeadCell from "./components/CollectionAssetsHeadCell";

export type IActiveFilter = { name: string; isActive: boolean };

export default function CollectionAssetsCard() {
  const dispatch = useAppDispatch();
  const entities = useAppSelector(
    (state) => state.entityCollection.entityCollections[0]?.entities
  );
  const selectedAssetExternalId = useAppSelector(selectSelectedAssetExternalId);

  const [entitiesData, setEntitiesData] = useState<IEntityExtended[]>([]);

  const [activeFilters, setActiveFilters] = useState<IActiveFilter[]>([
    { name: "Serial number", isActive: false },
    { name: "CARBON claimable", isActive: false },
    { name: "CARBON Issued", isActive: false },
  ]);

  const handleClickAssetRow = (entity: IEntity) => () => {
    if (selectedAssetExternalId === entity.externalId)
      dispatch(setSelectedEntity(undefined));
    else dispatch(setSelectedEntity(entity));
  };

  const handleFilterActive = (index: number) => {
    setActiveFilters((prevFilters) =>
      prevFilters.map((filter, filterIndex) =>
        filterIndex === index
          ? { ...filter, isActive: !filter.isActive }
          : { ...filter, isActive: false }
      )
    );

    // TODO: fill with claimable and issued data, after adding new ways of sorting according to the arrived values
    // TODO: when data arrives remove the else block and simply resort the entity array
    switch (activeFilters[index].name) {
      case "Serial number":
        if (activeFilters[index].isActive)
          setEntitiesData((prevData) =>
            prevData
              ?.slice()
              .sort(
                (a, b) =>
                  parseInt(a.alsoKnownAs.split(`#`)[1], 10) -
                  parseInt(b.alsoKnownAs.split(`#`)[1], 10)
              )
          );
        else
          setEntitiesData((prevData) =>
            prevData
              ?.slice()
              .sort(
                (a, b) =>
                  parseInt(b.alsoKnownAs.split(`#`)[1], 10) -
                  parseInt(a.alsoKnownAs.split(`#`)[1], 10)
              )
          );
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (Array.isArray(entities)) {
      setEntitiesData(entities);
    }
  }, [entities]);

  useEffect(
    () => () => {
      dispatch(setSelectedEntity(undefined));
    },
    []
  );

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
            <Suspense fallback={<Loading />}>
              {entitiesData?.map((entity) => (
                <CollectionAssetRow
                  entity={entity}
                  key={`row-${entity.externalId}`}
                  activeFilters={activeFilters}
                  selectedAssetExternalId={selectedAssetExternalId}
                  handleClickAssetRow={handleClickAssetRow}
                />
              ))}
            </Suspense>
          </tbody>
        </Table>
      </ScrollArea>
    </PageBlock>
  );
}
