import { selectCollection } from "@/redux/collectionSlice";
import { setSelectedAssetId, setSelectedView } from "@/redux/userSlice";
import { palette } from "@/theme/palette";
import { mobileBreakpoint, tabletBreakpoint } from "@/constants/breakpoints";
import {
  Card,
  Text,
  Divider,
  Group,
  Grid,
  Table,
  Badge,
  ScrollArea,
  UnstyledButton,
  Space
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArrowRight from "../news/icons/arrowRight";
import Sale from "./icons/sale";
import Loading from "./loading";

function OwnedAssets() {
  const viewPortSize = useViewportSize();
  const screenMultiplier: number =
    viewPortSize.width >= 1500 || viewPortSize.width <= tabletBreakpoint
      ? 0.5
      : 0.4;

  const tempData = useSelector(selectCollection);
  const dispatch = useDispatch();

  const [data, setData] = useState(tempData.entities);

  const [sortAssets, setSortAssets] = useState({
    SerialSort: false,
    CarbonClaim: false,
    CarbonIs: false,
  });

  const headers = [
    { id: 0, name: "Serial number", filterActive: false, filterImg: false },
    { id: 1, name: "CARBON claimable", filterActive: false, filterImg: false },
    { id: 2, name: "CARBON Issued", filterActive: false, filterImg: false },
    {
      id: 3,
      name: "Rating",
      filterActive: false,
      filterImg: false,
    },
    { id: 4, name: "Select", filterActive: false, filterImg: false },
  ];

  const [headerFilters, setHeaderFilters] = useState(headers);

  const handleActiveFilter = (index: number) => {
    const copy = [...headers];
    const dataCopy = [...data];
    let item = copy[index];
    item.filterActive = !item.filterActive;
    setHeaderFilters(copy);
    switch (item.name) {
      case "Serial number":
        item.filterActive
          ? setData(
            dataCopy.sort(
              (a, b) =>
                parseInt(a.alsoKnownAs.split(`#`)[1]) -
                parseInt(b.alsoKnownAs.split(`#`)[1])
            )
          )
          : setData(
            dataCopy.sort(
              (a, b) =>
                parseInt(b.alsoKnownAs.split(`#`)[1]) -
                parseInt(a.alsoKnownAs.split(`#`)[1])
            )
          );
        break;

      case "CARBON claimable":
        item.filterActive
          ? setData(dataCopy.sort((a, b) => {
            if (!a.CARBONClaimable[0]?.balance) {
              return 0 - parseFloat(b.CARBONClaimable[0]?.balance)
            }
            else {
              return parseFloat(a.CARBONClaimable[0]?.balance) - parseFloat(b.CARBONClaimable[0]?.balance)
            }
          }))
          : setData(dataCopy.sort((a, b) => 0 - parseFloat(a.CARBONClaimable[0]?.balance)))
        break;

      case "CARBON Issued":
        item.filterActive
          ? setData(dataCopy.sort((a, b) => {
            if (!a.CARBONClaimable[0]?.balance) {
              return 0 - parseFloat(b.CARBONClaimable[0]?.balance)
            }
            else {
              return parseFloat(a.CARBONClaimable[0]?.balance) - parseFloat(b.CARBONClaimable[0]?.balance)
            }
          }))
          : setData(dataCopy.sort((a, b) => 0 - parseFloat(a.CARBONClaimable[0]?.balance)))
        break;

      case "Stove creation date":
        item.filterActive
          ? setData(dataCopy.sort((a, b) => a.symbol - b.symbol))
          : setData(dataCopy.sort((a, b) => a.symbol - b.symbol));
        break;

      case "Asset owner":
        item.filterActive
          ? setData(dataCopy.sort((a, b) => b.resr - a.resr))
          : setData(dataCopy.sort((a, b) => a.resr - b.resr));
        break;

      default:
        break;
    }
  };

  const rows = data?.map((element) => {
    let aka: string[] = element.alsoKnownAs.split(`}`);
    if (element.alsoKnownAs !== "")
      return (
        <tr
          key={element.id}
          onClick={() => {
            // Id is returned as a link with the actual id in the link this extracts the Id from the link
            let tempDeviceId = element.device.credentialSubject.id;
            tempDeviceId = tempDeviceId.split("id=");
            tempDeviceId = tempDeviceId[1];

            dispatch(
              setSelectedAssetId({
                deviceId: tempDeviceId,
                assetId: element.alsoKnownAs,
              })
            );
            dispatch(setSelectedView("singleAsset"));
          }}
          style={{ cursor: "pointer" }}
        >
          {/* serial number  */}
          <td
            style={{
              color: sortAssets.SerialSort ? "#5FA8EB" : "black",
            }}
          >
            {aka[1]}
          </td>
          <td style={{ color: sortAssets.CarbonClaim ? "#5FA8EB" : "black" }}>
            {element.CARBONClaimable[0]?.balance ? element.CARBONClaimable[0]?.balance : 0}
          </td>
          <td style={{ color: sortAssets.CarbonIs ? "#5FA8EB" : "black" }}>
            {element.CarbonGenerated}
          </td>
          <td style={{ color: sortAssets.CarbonClaim ? "#5FA8EB" : "black" }}>
            {/* {element.CarbonClaimed} */}
          </td>
          <td style={{ color: sortAssets.CarbonIs ? "#5FA8EB" : "black" }}>
            {/* {element.CarbonGenerated} */}
          </td>
        </tr>
      );
  });

  function handleSortColor(index) {
    const headerCopy = [...headers]


    let item = headerCopy[index]

    item.filterActive = !item.filterActive

    switch (item.name) {
      case "Serial number":
        setSortAssets((prev) => {
          return {
            SerialSort: !prev.SerialSort,
            CarbonClaim: false,
            CarbonIs: false,
          }
        })
        headers[0].filterActive = true
        break;
      case "CARBON claimable":
        setSortAssets((prev) => {
          return {
            SerialSort: false,
            CarbonClaim: !prev.CarbonClaim,
            CarbonIs: false,
          }
        })
        headers[1].filterActive = true
        break;
      default:

    }
  }

  const heads = headerFilters.map((element, index) => (
    <th key={index} style={{ padding: element.name === "Select" ? 0 : 10 }}>
      <UnstyledButton
        style={{ display: "flex" }}
        onClick={() => {
          handleActiveFilter(index);
          handleSortColor(index)
        }}
      >
        <Text
          style={{
            fontSize: 12,
            color: element.filterActive ? palette.fullBlue : palette.Black,
          }}
        >
          {element.name}
        </Text>
        <Space w="xs" />
        {/* {element.filterActive ? (
          <AlphabeticalFilter fill={palette.fullBlue} />
        ) : (
          <></>
        )} */}
      </UnstyledButton>
    </th>
  ));

  return (
    <Card
      shadow="sm"
      p="lg"
      radius={16}
      withBorder
      style={{
        width:
          viewPortSize.width >= tabletBreakpoint
            ? viewPortSize.width * 0.447
            : 358,
        height: 452,
      }}
    >
      <Text
        style={{
          textAlign: "left",

          fontWeight: "400",
          fontSize: 16,
        }}
      >
        OWNED ASSETS
      </Text>
      <Divider my="sm" />
      <ScrollArea
        h={viewPortSize.height >= mobileBreakpoint ? 425 : 328}
        w={"100%"}
        type={"scroll"}
      >
        <Suspense fallback={<Loading />}>
          <Table highlightOnHover={true} style={{ marginBottom: 55 }}>
            <thead>
              <tr>
                {heads}
              </tr>
            </thead>

            <tbody>{rows}</tbody>
          </Table>
        </Suspense>
      </ScrollArea>
      <Group>
        <Badge
          style={{ width: 180, height: 45 }}
          sx={{ paddingLeft: 0 }}
          size="lg"
          radius="xl"
          color={palette.greenFull}
          variant="filled"
          leftSection={
            <div style={{ paddingTop: 5 }}>
              <ArrowRight />
            </div>
          }
        >
          Transfer
        </Badge>

        <Badge
          style={{ width: 180, height: 45 }}
          variant="filled"
          size="lg"
          radius="xl"
          color={palette.greenFull}
          sx={{ paddingRight: 3 }}
          leftSection={
            <div style={{ paddingTop: 7 }}>
              <Sale />
            </div>
          }
        >
          List for sale
        </Badge>
      </Group>
    </Card>
  );
}

export default OwnedAssets;
