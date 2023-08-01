import { mobileBreakpoint } from "@/constants/breakpoints";
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
import { useViewportSize, useDisclosure } from "@mantine/hooks";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setSelectedView } from "@/redux/userSlice";
import { Suspense, useEffect, useState } from "react";
import CookstoveModal from "@/components/Modals/CookstoveModal";
import Head from "next/head";
import ArrowRight from "../NewsCard/icons/arrowRight";
import DownArrow from "./icons/downArrow";
import Loading from "./loading";

function AssetsCard() {
  const dispatch = useAppDispatch();
  const entities = useAppSelector(
    (state) => state.entityCollection.entityCollections[0].entities
  );
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
  const [selectedExternalId, setSelectedExternalId] = useState("");

  const handleClickAssetRow = (id: string) => () => {
    setSelectedExternalId(id);
  };

  const rows = entitiesData?.map((entity) => {
    if (entity.externalId !== "") {
      return (
        <tr
          key={entity.id}
          onClick={handleClickAssetRow(entity.externalId)}
          style={{ cursor: "pointer" }}
        >
          <td
            style={{
              color: sortAssets.SerialNumber ? "#5FA8EB" : "black",
            }}
          >
            {entity.externalId}
          </td>
          <td
            style={{ color: sortAssets.CarbonClaimable ? "#5FA8EB" : "black" }}
          >
            {0}
          </td>
          <td style={{ color: sortAssets.CarbonIssued ? "#5FA8EB" : "black" }}>
            {0}
          </td>
          {selectedExternalId === entity.externalId && (
            <Modal.Root
              opened={opened}
              onClose={() => setSelectedExternalId("")}
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
                    entityId={selectedExternalId}
                    entity={entity}
                  />
                </Modal.Body>
              </Modal.Content>
            </Modal.Root>
          )}
        </tr>
      );
    }
  });

  const viewPortSize = useViewportSize();

  // not working with actual data
  const handleFilterActive = (index: number) => {
    const copy = [...headers];
    const copyData = [...entitiesData];
    const item = copy[index];
    item.filterActive = !item.filterActive;
    setHeader(copy);
    switch (item.name) {
      case "Serial number":
        item.filterActive
          ? setEntitiesData(
              copyData?.sort(
                (a, b) =>
                  parseInt(a.alsoKnownAs.split(`#`)[1]) -
                  parseInt(b.alsoKnownAs.split(`#`)[1])
              )
            )
          : setEntitiesData(
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
    if (selectedExternalId) {
      open();
    } else {
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedExternalId]);

  return (
    <Card radius={16} style={{ padding: "1rem 2rem" }} h="100%">
      <Grid align="center" justify="space-between">
        <Grid.Col span={6}>
          <Text
            style={{
              textAlign: "left",
              fontWeight: "400",
              fontSize: 16,
            }}
          >
            ASSETS
          </Text>
        </Grid.Col>
        <Grid.Col span="content">
          <Group
            onClick={() => dispatch(setSelectedView("fullAssets"))}
            style={{ cursor: "pointer" }}
          >
            <Text
              style={{
                textAlign: "right",
                fontWeight: "400",
                fontSize: 16,
              }}
            >
              SEE ALL
            </Text>
            <ArrowRight pathFill="#000" />
          </Group>
        </Grid.Col>
      </Grid>
      <Divider mb="lg" color="#000000" />
      <ScrollArea
        h={viewPortSize.height >= mobileBreakpoint ? 425 : 328}
        type="scroll"
      >
        <Table
          highlightOnHover
          style={{
            alignSelf: "stretch",
            width: viewPortSize.width >= mobileBreakpoint ? 390 : 243,
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
                  Serial number{" "}
                  {sortAssets.SerialNumber ? <DownArrow /> : <></>}
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
                  {sortAssets.CarbonClaimable ? <DownArrow /> : <></>}
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
                  CARBON Issued{" "}
                  {sortAssets.CarbonIssued ? <DownArrow /> : <></>}
                </Text>
              </th>
            </tr>
          </thead>
          <tbody>
            <Suspense fallback={<Loading />}>{rows}</Suspense>
          </tbody>
        </Table>
      </ScrollArea>
    </Card>
  );
}

export default AssetsCard;
