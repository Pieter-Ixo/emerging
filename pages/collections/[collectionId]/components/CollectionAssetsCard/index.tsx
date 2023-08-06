import { Suspense, useEffect, useState } from "react";
import {
  ScrollArea,
  Table,
  Text,
} from "@mantine/core";

import { setSelectedEntity } from "@/redux/entityCollections/slice";
import { selectSelectedAssetExternalId } from "@/redux/entityCollections/selectors";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { IEntity, IEntityExtended } from "@/types/entityCollections";

import ArrowRight from "../CollectionNewsCard/icons/arrowRight";
import DownArrow from "./icons/downArrow";
import Loading from "./loading";
import PageBlock from "../PageBlock";
import CollectionAssetRow from "./components/CollectionAssetRow";

// TODO: split component onto few smaller ones
export default function CollectionAssetsCard() {
  const dispatch = useAppDispatch();
  const entities = useAppSelector(
    (state) => state.entityCollection.entityCollections[0]?.entities
  );
  const selectedAssetExternalId = useAppSelector(selectSelectedAssetExternalId);

  const [entitiesData, setEntitiesData] = useState<IEntityExtended[]>([]);
  const heads = [
    { name: "Serial number", filterActive: false },
    { name: "CARBON claimable", filterActive: false },
    { name: "CARBON Issued", filterActive: false },
  ];

  const [sortAssets, setSortAssets] = useState({
    SerialNumber: false,
    CarbonClaimable: false,
    CarbonIssued: false,
  });
  const [headers, setHeader] = useState(heads);

  const handleClickAssetRow = (entity: IEntity) => () => {
    if (selectedAssetExternalId === entity.externalId)
      dispatch(setSelectedEntity(undefined));
    else dispatch(setSelectedEntity(entity));
  };


  const handleFilterActive = (index: number) => {
    const copy = [...headers];
    const copyData: IEntityExtended[] = [...entitiesData];
    const item = copy[index];

    item.filterActive = !item.filterActive;

    setHeader(copy);

    switch (item.name) {
      case "Serial number":
        if (item.filterActive)
          setEntitiesData(
            copyData?.sort(
              (a, b) =>
                parseInt(a.alsoKnownAs.split(`#`)[1], 10) -
                parseInt(b.alsoKnownAs.split(`#`)[1], 10)
            )
          );
        else
          setEntitiesData(
            copyData?.sort(
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
              <th
                style={{
                  cursor: "pointer",
                  color: sortAssets.SerialNumber ? "#5FA8EB" : "black",
                  width: 65,
                }}
                onClick={() => {
                  handleFilterActive(0);
                  setSortAssets((prevSorts) => ({
                    SerialNumber: !prevSorts.SerialNumber,
                    CarbonClaimable: false,
                    CarbonIssued: false,
                  }));
                }}
              >
                <Text style={{ display: "flex" }}>
                  Serial number {sortAssets.SerialNumber ? <DownArrow /> : null}
                </Text>
              </th>

              <th
                style={{
                  cursor: "pointer",
                  color: sortAssets.CarbonClaimable ? "#5FA8EB" : "black",
                  width: 65,
                }}
                onClick={() => {
                  handleFilterActive(1);
                  setSortAssets((prevSorts) => ({
                    CarbonClaimable: !prevSorts.CarbonClaimable,
                    SerialNumber: false,
                    CarbonIssued: false,
                  }));
                }}
              >
                <Text style={{ display: "flex" }}>
                  CARBON claimable{" "}
                  {sortAssets.CarbonClaimable ? <DownArrow /> : null}
                </Text>
              </th>

              <th
                style={{
                  cursor: "pointer",
                  color: sortAssets.CarbonIssued ? "#5FA8EB" : "black",
                  width: 65,
                }}
                onClick={() => {
                  handleFilterActive(2);
                  setSortAssets((prevSorts) => ({
                    CarbonIssued: !prevSorts.CarbonIssued,
                    SerialNumber: false,
                    CarbonClaimable: false,
                  }));
                }}
              >
                <Text style={{ display: "flex" }}>
                  CARBON Issued {sortAssets.CarbonIssued ? <DownArrow /> : null}
                </Text>
              </th>
            </tr>
          </thead>
          <tbody>
            <Suspense fallback={<Loading />}>
              {entitiesData?.map((entity) => (
                <CollectionAssetRow
                  entity={entity}
                  key={`row-${entity.externalId}`}
                  sortAssets={sortAssets}
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
