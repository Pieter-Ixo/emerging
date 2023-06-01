import { mobileBreakpoint } from "@/constants/breakpoints";
import {
  Button,
  Card,
  Divider,
  Grid,
  Group,
  ScrollArea,
  Table,
  Text,
} from "@mantine/core";
import { useViewportSize, useDisclosure } from "@mantine/hooks";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setSelectedView } from "@/redux/userSlice";
import { Suspense, useEffect, useState } from "react";
import ArrowRight from "../news/icons/arrowRight";
import DownArrow from "./icons/downArrow";
import Loading from "./loading";
import Cookstove from "../Modals/CookstoveModal";
import CookstoveModal from "../Modals/CookstoveModal";

function EmergingAssets() {
  console.log("in EmergingAssets");
  const dispatch = useAppDispatch();
  const entities = useAppSelector((state) => state.collection.entities[0]);
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

  console.log({entitiesData })

  const rows = entitiesData?.map((entity) => {
    if (entity.externalId !== "") {
      return (
        <tr
          key={entity.id}
          onClick={handleClickAssetRow(entity.externalId)}
          // onClick={() => {
          //   setIsModal(true);
          // }}
          // onClick={() => {
          //   console.log("onClick");
          //   dispatch(
          //     setSelectedExternalId({
          //       deviceId: entity.alsoKnownAs,
          //       externalId: entity.externalId,
          //     })
          //   );
          //   dispatch(setSelectedView("singleAsset"));
          // }}
          style={{ cursor: "pointer" }}
        >
          {/* <Modal
            opened={isModal}
            onClose={() => {
              setIsModal(false);
            }}
            centered={true}
            radius={16}
            size="lg"
          >
            <Cookstove id={entity.externalId} />
          </Modal> */}
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
            {
              0
              /* {entity.CARBONClaimable[0]?.balance
              ? entity.CARBONClaimable[0]?.balance
              : 0} */
            }
          </td>
          <td style={{ color: sortAssets.CarbonIssued ? "#5FA8EB" : "black" }}>
            {
              0
              /* {entity.CarbonIssued} */
            }
          </td>
        </tr>
      );
    }
  });

  const viewPortSize = useViewportSize();

  //not working with actual data
  const handleFilterActive = (index: number) => {
    const copy = [...headers];
    const copyData = [...entitiesData];
    let item = copy[index];
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
      // case "CARBON claimable":
      //   item.filterActive
      //     ? setEntitiesData(
      //       copyData.sort((a, b) => {
      //         if (!a.CARBONClaimable[0]?.balance) {
      //           return 0 - parseFloat(b.CARBONClaimable[0]?.balance);
      //         } else {
      //           return (
      //             parseFloat(a.CARBONClaimable[0]?.balance) -
      //             parseFloat(b.CARBONClaimable[0]?.balance)
      //           );
      //         }
      //       })
      //     )
      //     : setEntitiesData(
      //       copyData.sort(
      //         (a, b) => 0 - parseFloat(a.CARBONClaimable[0]?.balance)
      //       )
      //     );
      //   break;
      // case "CARBON generated":
      //   item.filterActive
      //     ? setEntitiesData(
      //       copyData.sort((a, b) => {
      //         if (!a.CARBONClaimable[0]?.balance) {
      //           return 0 - parseFloat(b.CARBONClaimable[0]?.balance);
      //         } else {
      //           return (
      //             parseFloat(a.CARBONClaimable[0]?.balance) -
      //             parseFloat(b.CARBONClaimable[0]?.balance)
      //           );
      //         }
      //       })
      //     )
      //     : setEntitiesData(
      //       copyData.sort(
      //         (a, b) => 0 - parseFloat(a.CARBONClaimable[0]?.balance)
      //       )
      //     );
      //   break;

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
    <>
      <Card
        shadow="sm"
        p="lg"
        radius={16}
        withBorder
        style={{
          width: viewPortSize.width >= mobileBreakpoint ? 400 : 358,
          height: viewPortSize.height >= mobileBreakpoint ? 455 : 358,
        }}
      >
        <Grid align={"center"} justify="space-between">
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
        <Divider my="sm" />
        <ScrollArea
          h={viewPortSize.height >= mobileBreakpoint ? 425 : 328}
          type={"scroll"}
        >
          <Table
            highlightOnHover={true}
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
                    setSortAssets((prevSorts) => {
                      return {
                        SerialNumber: !prevSorts.SerialNumber,
                        CarbonClaimable: false,
                        CarbonIssued: false,
                      };
                    });
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
                    setSortAssets((prevSorts) => {
                      return {
                        CarbonClaimable: !prevSorts.CarbonClaimable,
                        SerialNumber: false,
                        CarbonIssued: false,
                      };
                    });
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
                    setSortAssets((prevSorts) => {
                      return {
                        CarbonIssued: !prevSorts.CarbonIssued,
                        SerialNumber: false,
                        CarbonClaimable: false,
                      };
                    });
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
      {selectedExternalId && (
        <CookstoveModal
          opened={opened}
          onClose={() => setSelectedExternalId("")}
          id={Number(selectedExternalId)}
        />
      )}
    </>
  );
}

export default EmergingAssets;
