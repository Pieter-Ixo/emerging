import { selectSupa } from "@/redux/supamotoSlice";
import {
  increment,
  decrement,
  selectAuthState,
} from "@/redux/userSlice";
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
  Radio,
  UnstyledButton,
  Stack,
  Space,
  ScrollArea
} from "@mantine/core";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filter from "../myPortfolio/filter";
import ArrowRight from "../news/icons/arrowRight";
import AlphabeticalFilter from "./icons/alphabeticalFilter";
import Inactive from "./icons/inactive";
import Search from "./icons/search";
import Star from "./icons/star";
import Tick from "./icons/tick";
import { faker } from "@faker-js/faker";
import { useViewportSize } from "@mantine/hooks";
import { create } from "apisauce";
import useSWR from "swr";
import { getStovesPage } from "@/utils/api-helper";
import { selectCollection } from "@/redux/collectionSlice";
import dayjs from "dayjs";
import Eye from "../emergingAssets/icons/eye";

function NFT_List() {

  const counter = useSelector(selectAuthState);
  const dispatch = useDispatch();
  const viewPortSize = useViewportSize();
  const NFTs = useSelector(selectCollection)

  const [data, setData] = useState(NFTs.entities)

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

  //change CarbonGen to Carbon issued
  const [sortAssets, setSortAssets] = useState({
    sortSerialNum: false,
    sortCarbonClaim: false,
    sortCarbonGen: false,
    sortCreateDate: false,
    sortOwner: false,
  });

  const [headerFilters, setHeaderFilters] = useState(headers);

  console.log("data", NFTs.entities)

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

      case "CARBON generated":
        item.filterActive
          ? setData(dataCopy.sort((a, b) => b.symbol - a.symbol))
          : setData(dataCopy.sort((a, b) => a.symbol - b.symbol));
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

  const rows = data.map((element) => {
    // replace wasn't working
    let aka: string[] = element.alsoKnownAs.split(`}`);
    return (
      <tr
        key={element.name}
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
          {element.CARBONClaimable[0]?.balance ? element.CARBONClaimable[0]?.balance : 0}
        </td>
        <td
          style={{
            color: sortAssets.sortCarbonGen ? "#5FA8EB" : "black",
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
          {truncate(element.accounts[0].address, 30, ".....")}
          {<Eye style={{ paddingLeft: 1.5 }} />}
        </td>
        <td>{<Star />}</td>
      </tr>
    );
  });

  function handleFilterColor(index) {

    switch (index) {
      case 0:
        console.log("hererer: ", index)
        setSortAssets((prevSorts) => {
          return {
            sortSerialNum: !prevSorts.sortSerialNum,
            sortCarbonClaim: false,
            sortCarbonGen: false,
            sortCreateDate: false,
            sortOwner: false,
          }
        })
        break;

      case 1:
        setSortAssets((prevSorts) => {
          return {
            sortSerialNum: false,
            sortCarbonClaim: !prevSorts.sortCarbonClaim,
            sortCarbonGen: false,
            sortCreateDate: false,
            sortOwner: false,
          }
        })
        break;

      case 2:
        setSortAssets((prevSorts) => {
          return {
            sortSerialNum: false,
            sortCarbonClaim: false,
            sortCarbonGen: !prevSorts.sortCarbonGen,
            sortCreateDate: false,
            sortOwner: false,
          }
        })
        break;

      case 3:
        setSortAssets((prevSorts) => {
          return {
            sortSerialNum: false,
            sortCarbonClaim: false,
            sortCarbonGen: false,
            sortCreateDate: !prevSorts.sortCreateDate,
            sortOwner: false,
          }
        })
        break;

      case 4:
        setSortAssets((prevSorts) => {
          return {
            sortSerialNum: false,
            sortCarbonClaim: false,
            sortCarbonGen: false,
            sortCreateDate: false,
            sortOwner: !prevSorts.sortOwner,
          }
        })
        break;
    }
  }


  const heads = headers.map((element, index) => (
    <th key={index} style={{ padding: element.name === "Select" ? 0 : 10 }}>
      <UnstyledButton
        style={{ display: "flex" }}
        onClick={() => {
          handleActiveFilter(index);
          // handleFilterColor(index)

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
        {element.filterActive ? (
          <AlphabeticalFilter fill={palette.fullBlue} />
        ) : (
          <></>
        )}
      </UnstyledButton>
    </th>
  ));


  return (
    <Stack
      style={{
        maxHeight: "100%",
        width: viewPortSize.width - 420,
        overflowX: viewPortSize.width >= 1550 ? "hidden" : "scroll",
      }}
    >
      <Card shadow="sm" p="lg" radius={16} withBorder style={{ width: 1100 }}>
        <Grid>
          <Grid.Col span={6}>
            <Text
              style={{
                textAlign: "left",
                fontWeight: 500,
                fontSize: 16,
              }}
            >
              NFT's
            </Text>
          </Grid.Col>
        </Grid>
        <Divider my="sm" />

        <Group>
          <Input
            style={{
              backgroundColor: palette.Neutral100,
              borderRadius: 20,
              padding: 3,
            }}
            icon={<Search />}
            variant="unstyled"
            placeholder="Search"
            radius={20}
          />
          <Filter />
        </Group>
        <Text
          style={{
            textAlign: "left",
            fontWeight: "400",
            paddingTop: 30,
            paddingBottom: 10,
            paddingLeft: 5,
            fontSize: 12,
            color: "#CACACA",
          }}
        >
          SupaMoto - Malawi Collection 2022
        </Text>
        <ScrollArea
          type="hover"
          scrollbarSize={10}
          scrollHideDelay={4000}
          h={600}
        >
          <Table highlightOnHover={true} verticalSpacing="xs">
            <thead>
              <tr>
                {heads}
                {/* Select All */}
                <th style={{ padding: 0 }}>
                  <UnstyledButton
                    style={{ display: "flex" }}
                  //   onClick={() => {
                  //     handleAllSelect();
                  //   }}
                  >
                    <Text style={{ fontSize: 12, color: palette.fullBlue }}>
                      All
                    </Text>
                  </UnstyledButton>
                </th>
              </tr>
            </thead>

            <tbody>{rows}</tbody>

          </Table>
        </ScrollArea>
      </Card>
    </Stack>
  );
}

export default NFT_List;
