import { Suspense, useEffect, useState } from "react";
import Head from "next/head";
import {
  Card,
  Divider,
  Grid,
  Group,
  Modal,
  ScrollArea,
  Table,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { setSelectedView } from "@/redux/userSlice";
import { setSelectedEntity } from "@/redux/entityCollections/slice";
import { selectSelectedAssetExternalId } from "@/redux/entityCollections/selectors";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import CookstoveModal from "@/components/Modals/CookstoveModal";
import { IEntity } from "@/types/entityCollections";

import ArrowRight from "../CollectionNewsCard/icons/arrowRight";
import DownArrow from "./icons/downArrow";
import Loading from "./loading";
import PageBlock from "../PageBlock";

// TODO: split component onto few smaller ones
export default function CollectionAssetsCard() {
  const dispatch = useAppDispatch();
  const entities = useAppSelector(
    (state) => state.entityCollection.entityCollections[0]?.entities
  );
  const selectedAssetExternalId = useAppSelector(selectSelectedAssetExternalId);

  const [entitiesData, setEntitiesData] = useState<any[]>([]);
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
  const [opened, { open, close }] = useDisclosure(false);

  const handleClickAssetRow = (entity: IEntity) => () => {
    if (selectedAssetExternalId === entity.externalId)
      dispatch(setSelectedEntity(undefined));
    else dispatch(setSelectedEntity(entity));
  };

  // TODO: move rows to separate component
  const rows = entitiesData?.map((entity) => {
    if (entity.externalId === "") return null;

    const isSelectedRow = selectedAssetExternalId === entity.externalId;
    return (
      <tr
        key={entity.id}
        onClick={handleClickAssetRow(entity)}
        style={{
          cursor: "pointer",
          backgroundColor: isSelectedRow ? "#F8F8F8" : "inherit",
        }}
      >
        <td
          style={{
            color: sortAssets.SerialNumber ? "#5FA8EB" : "black",
          }}
        >
          {entity.externalId}
        </td>
        <td style={{ color: sortAssets.CarbonClaimable ? "#5FA8EB" : "black" }}>
          {0}
        </td>
        <td style={{ color: sortAssets.CarbonIssued ? "#5FA8EB" : "black" }}>
          {0}
        </td>
        {isSelectedRow && (
          <Modal.Root
            opened={opened}
            onClose={() => {
              dispatch(setSelectedEntity(undefined));
              close();
            }}
            radius={16}
            size="md"
            centered
            scrollAreaComponent={ScrollArea.Autosize}
          >
            <Head>
              <title>Supamoto Dashboard</title>
              <meta name="description" content="Supamoto Dashboard" />
            </Head>

            <Modal.Overlay />
            <Modal.Content>
              <Modal.Header style={{ height: 36 }}>
                <Modal.Title>Supamoto Dashboard</Modal.Title>
                <Modal.CloseButton />
              </Modal.Header>
              <Modal.Body style={{ padding: 0 }}>
                <CookstoveModal
                  id={Number(selectedAssetExternalId)}
                  entity={entity}
                />
              </Modal.Body>
            </Modal.Content>
          </Modal.Root>
        )}
      </tr>
    );
  });

  const handleFilterActive = (index: number) => {
    const copy = [...headers];
    const copyData = [...entitiesData];
    const item = copy[index];
    item.filterActive = !item.filterActive;
    setHeader(copy);
    switch (item.name) {
      case "Serial number":
        if (item.filterActive)
          setEntitiesData(
            copyData?.sort(
              (a, b) =>
                parseInt(a.alsoKnownAs.split(`#`)[1]) -
                parseInt(b.alsoKnownAs.split(`#`)[1])
            )
          );
        else
          setEntitiesData(
            copyData?.sort(
              (a, b) =>
                parseInt(b.alsoKnownAs.split(`#`)[1]) -
                parseInt(a.alsoKnownAs.split(`#`)[1])
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

  useEffect(() => {
    if (selectedAssetExternalId) {
      open();
    } else {
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAssetExternalId]);

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
            <Suspense fallback={<Loading />}>{rows}</Suspense>
          </tbody>
        </Table>
      </ScrollArea>
    </PageBlock>
  );
}
