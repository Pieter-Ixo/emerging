import { palette } from "@/theme/palette";
import {
  Card,
  Text,
  Divider,
  Group,
  Badge,
  Grid,
  Col,
  Image,
  Table,
  Input,
  Button,
} from "@mantine/core";
import { setSelectedAssetId, setSelectedView } from "@/redux/userSlice";

import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filter from "../Inventory/icons/filter";
import Search from "../Inventory/icons/search";
import Star from "../Inventory/icons/star";
import ArrowRight from "../news/icons/arrowRight";
import DescendingFilter from "./icons/descendingFilter";
import Eye from "./icons/eye";
import ArrowLeft from "../news/icons/arrowLeft";
import { useViewportSize } from "@mantine/hooks";
import { selectCollection } from "@/redux/collectionSlice";
// import Filter from "./icons/filter";
// import Search from "./icons/search";
import dayjs from "dayjs";
import Loading from "../Inventory/Fallback/loading";

dayjs().format();

function EmergingAssetsFull() {
  const truncate = function (
    fullStr: string | undefined,
    strLen: number,
    separator: string
  ) {
    try {
      if (!fullStr) {
        return;
      }
      if (fullStr.length <= strLen) return fullStr;

      separator = separator || "...";

      var sepLen = separator.length,
        charsToShow = strLen - sepLen,
        frontChars = Math.ceil(charsToShow / 2),
        backChars = Math.floor(charsToShow / 2);

      return (
        fullStr.substring(0, frontChars) +
        separator +
        fullStr.substring(fullStr.length - backChars)
      );
    } catch (e) {
      return "";
    }
  };

  const headers = [
    { id: 0, name: "Serial number", filterActive: false, filterImg: false },
    { id: 1, name: "CARBON claimable", filterActive: false, filterImg: false },
    { id: 2, name: "CARBON generated", filterActive: false, filterImg: false },
    {
      id: 3,
      name: "Stove creation date",
      filterActive: false,
      filterImg: false,
    },
    { id: 4, name: "Asset owner", filterActive: false, filterImg: false },
  ];

  const dispatch = useDispatch();

  const [sortAssets, setSortAssets] = useState({
    sortSerialNum: false,
    sortCarbonClaim: false,
    sortCarbonIs: false,
    sortCreateDate: false,
    sortOwner: false,
  });
  const tempData = useSelector(selectCollection);
  console.log("Entites in full assets", tempData.entities);
  const [data, setData] = useState(tempData.entities);
  const [headerFilters, setHeaderFilters] = useState(headers);

  const rows = data.map((element) => {
    // replace wasn't working
    let aka: string[] = element.alsoKnownAs.split(`}`);
    //did:ixo:entity:7b40f2500d4c89997f8389c5f2318cdb

    if (element.alsoKnownAs !== "")
      return (
        <tr
          key={element.name}
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
        >
          {/* serial number  */}
          <td
            style={{
              color: sortAssets.sortSerialNum ? "#5FA8EB" : "black",
            }}
          >
            {aka[1]}
          </td>
          <td
            style={{
              color: sortAssets.sortCarbonClaim ? "#5FA8EB" : "black",
            }}
          >
            {element.CARBONClaimable[0]?.balance
              ? element.CARBONClaimable[0]?.balance
              : 0}
          </td>
          <td
            style={{
              color: sortAssets.sortCarbonIs ? "#5FA8EB" : "black",
            }}
          >
            {element.symbol}
          </td>
          <td
            style={{
              color: sortAssets.sortCreateDate ? "#5FA8EB" : "black",
            }}
          >
            {dayjs(element.date).format("YYYY/MM/DD")}
          </td>
          <td
            style={{
              color: sortAssets.sortOwner ? "#5FA8EB" : "black",
            }}
          >
            {/* truncate(userAddress, 32, ".....") || ""} */}
            {truncate(element.accounts[0].address, 32, ".....")}
            {<Eye style={{ paddingLeft: 1.5 }} />}
          </td>
          <td>{<Star />}</td>
        </tr>
      );
  });

  //filter case for each header
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
          ? setData(
              dataCopy.sort((a, b) => {
                if (!a.CARBONClaimable[0]?.balance) {
                  return 0 - parseFloat(b.CARBONClaimable[0]?.balance);
                } else {
                  return (
                    parseFloat(a.CARBONClaimable[0]?.balance) -
                    parseFloat(b.CARBONClaimable[0]?.balance)
                  );
                }
              })
            )
          : setData(
              dataCopy.sort(
                (a, b) => 0 - parseFloat(a.CARBONClaimable[0]?.balance)
              )
            );
        break;

      case "CARBON generated":
        item.filterActive
          ? setData(
              dataCopy.sort((a, b) => {
                if (!a.CARBONClaimable[0]?.balance) {
                  return 0 - parseFloat(b.CARBONClaimable[0]?.balance);
                } else {
                  return (
                    parseFloat(a.CARBONClaimable[0]?.balance) -
                    parseFloat(b.CARBONClaimable[0]?.balance)
                  );
                }
              })
            )
          : setData(
              dataCopy.sort(
                (a, b) => 0 - parseFloat(a.CARBONClaimable[0]?.balance)
              )
            );
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
  const viewPortSize = useViewportSize();
  //this handles the hover to render the sorting image
  function HandleHover(id: number) {
    const copy = [...headerFilters];
    let item = copy[id];
    item.filterImg = !item.filterImg;
    setHeaderFilters(copy);

    //console.log(item.filterImg);
  }

  return (
    <div
      style={{
        height: viewPortSize.height * 1.13,
        overflowY: "hidden",
        marginBottom: 50,
      }}
    >
      <div
        style={{
          overflowX: viewPortSize.width <= 980 ? "scroll" : "hidden",
          width: viewPortSize.width - 420,
        }}
      >
        <Card
          m={20}
          shadow="sm"
          p="lg"
          radius="md"
          withBorder
          style={{
            width:
              viewPortSize.width <= 980 ? 1200 : viewPortSize.width * 0.702,
            overflowY: "hidden",
          }}
        >
          <Grid style={{ overflowY: "hidden" }}>
            <Grid.Col span={11}>
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
            <Grid.Col span={1}>
              <Text
                style={{
                  textAlign: "right",
                  paddingRight: 10,
                  fontWeight: "400",
                  fontSize: 16,
                  cursor: "pointer",
                }}
                onClick={() => dispatch(setSelectedView("global"))}
              >
                <ArrowLeft />
              </Text>
            </Grid.Col>
          </Grid>
          <Divider my="sm" />

          <Group>
            <Input icon={<Search />} variant="filled" placeholder="Search" />
            <Button variant="light" color="gray" leftIcon={<Filter />}>
              <Text style={{ color: palette.Black }}>Filter</Text>
            </Button>
          </Group>

          <Table highlightOnHover={true}>
            <thead>
              <tr>
                <th
                  // onMouseEnter={() => {
                  //   HandleHover(0);
                  // }}
                  // onMouseLeave={() => {
                  //   HandleHover(0);
                  // }}
                  style={{
                    cursor: "pointer",
                    color: sortAssets.sortSerialNum ? "#5FA8EB" : "black",
                  }}
                  onClick={() => {
                    handleActiveFilter(0);
                    setSortAssets((prevSorts) => {
                      return {
                        sortSerialNum: !prevSorts.sortSerialNum,
                        sortCarbonClaim: false,
                        sortCarbonIs: false,
                        sortCreateDate: false,
                        sortOwner: false,
                      };
                    });
                  }}
                >
                  Serial number{" "}
                  {headerFilters[0].filterImg ? <DescendingFilter /> : <></>}
                </th>
                <th
                  // onMouseEnter={() => {
                  //   HandleHover(1);
                  // }}
                  // onMouseLeave={() => {
                  //   HandleHover(1);
                  // }}
                  style={{
                    cursor: "pointer",
                    color: sortAssets.sortCarbonClaim ? "#5FA8EB" : "black",
                  }}
                  onClick={() => {
                    handleActiveFilter(1);
                    setSortAssets((prevSorts) => {
                      return {
                        sortCarbonClaim: !prevSorts.sortCarbonClaim,
                        sortCarbonIs: false,
                        sortCreateDate: false,
                        sortOwner: false,
                        sortSerialNum: false,
                      };
                    });
                  }}
                >
                  CARBON claimable{" "}
                  {headerFilters[1].filterImg ? <DescendingFilter /> : <></>}
                </th>
                <th
                  // onMouseEnter={() => {
                  //   HandleHover(2);
                  // }}
                  // onMouseLeave={() => {
                  //   HandleHover(2);
                  // }}
                  style={{
                    cursor: "pointer",
                    color: sortAssets.sortCarbonIs ? "#5FA8EB" : "black",
                  }}
                  onClick={() => {
                    handleActiveFilter(2);
                    setSortAssets((prevSorts) => {
                      return {
                        sortCarbonIs: !prevSorts.sortCarbonIs,
                        sortCreateDate: false,
                        sortOwner: false,
                        sortSerialNum: false,
                        sortCarbonClaim: false,
                      };
                    });
                  }}
                >
                  CARBON Issued{" "}
                  {headerFilters[2].filterImg ? <DescendingFilter /> : <></>}
                </th>
                <th
                  // onMouseEnter={() => {
                  //   HandleHover(3);
                  // }}
                  // onMouseLeave={() => {
                  //   HandleHover(3);
                  // }}
                  style={{
                    cursor: "pointer",
                    color: sortAssets.sortCreateDate ? "#5FA8EB" : "black",
                  }}
                  onClick={() => {
                    handleActiveFilter(3);
                    setSortAssets((prevSorts) => {
                      return {
                        sortCreateDate: !prevSorts.sortCreateDate,
                        sortOwner: false,
                        sortSerialNum: false,
                        sortCarbonClaim: false,
                        sortCarbonIs: false,
                      };
                    });
                  }}
                >
                  Stove creation date{" "}
                  {headerFilters[3].filterImg ? <DescendingFilter /> : <></>}
                </th>
                <th
                  // onMouseEnter={() => {
                  //   HandleHover(4);
                  // }}
                  // onMouseLeave={() => {
                  //   HandleHover(4);
                  // }}
                  style={{
                    cursor: "pointer",
                    color: sortAssets.sortOwner ? "#5FA8EB" : "black",
                  }}
                  onClick={() => {
                    handleActiveFilter(4);
                    setSortAssets((prevSorts) => {
                      return {
                        sortOwner: !prevSorts.sortOwner,
                        sortSerialNum: false,
                        sortCarbonClaim: false,
                        sortCarbonIs: false,
                        sortCreateDate: false,
                      };
                    });
                  }}
                >
                  Asset owner{" "}
                  {headerFilters[4].filterImg ? <DescendingFilter /> : <></>}
                </th>
                <th>Owned</th>
              </tr>
            </thead>
            <tbody>
              <Suspense fallback={<Loading />}>{rows}</Suspense>
            </tbody>
          </Table>
        </Card>
      </div>
    </div>
  );
}

export default EmergingAssetsFull;
