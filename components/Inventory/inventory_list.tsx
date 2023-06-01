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

import { Suspense, useEffect, useState } from "react";
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
import Loading from "@/components/Inventory/Fallback/loading";
import { selectStoves, setStoves } from "@/redux/stoveSlice";
import dayjs from "dayjs";

function InventoryList() {
  const temp = [
    // { name: "Stove UID", filterActive: false },
    { name: "Device ID", filterActive: false },
    { name: "Model", filterActive: false },
    // { name: "Customer", filterActive: false },
    { name: "Country", filterActive: false },
    { name: "Date registered", filterActive: false },
    { name: "Status", filterActive: false },
    { name: "Minted", filterActive: false },
    { name: "Select", filterActive: false },
  ];

  const [headers, setHeaders] = useState(temp);
  const [data, setData] = useState<any[]>();
  const counter = useSelector(selectAuthState);
  const dispatch = useDispatch();
  const viewPortSize = useViewportSize();
  const [tempData, setTempData] = useState<any>();
  //const persistedInventory = useSelector(selectStoves)

  // useEffect(() => {
  //   setData(elements);
  // }, []);

  const sortString = (field: string) => {
    return data?.sort((a, b) => {
      //@ts-ignore
      let fa = a[field].toLowerCase(),
        //@ts-ignore
        fb = b[field].toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  };

  // API
  useEffect(() => {
    // const stoves =
    getStoves();
  }, []);

  async function getStoves() {
    const res = await getStovesPage();
    setData(res);
    // return res;
    //dispatch(setStoves(res))
  }

  useEffect(() => {

  }, [])

  const handleFilterActive = (index: number) => {
    const copy = [...headers];
    let item = copy[index];
    item.filterActive = !item.filterActive;
    setHeaders(copy);
    switch (item.name) {
      // case "Stove ID":
      //   item.filterActive
      //     ? // @ts-ignore
      //       setData(elements.sort((a, b) => a.uid - b.uid))
      //     : setData(elements);
      //   break;
      case "Device ID":
        item.filterActive
          ? // @ts-ignore
          setData(data.sort((a, b) => a.deviceId - b.deviceId))
          : setData(data);
        break;
      case "Model":
        item.filterActive ? setData(sortString("model")) : setData(data);
        break;
      // case "Customer":
      //   item.filterActive ? setData(sortString("customer")) : setData(data);
      //   break;
      case "Country":
        item.filterActive ? setData(sortString("country")) : setData(data);
        break;
      case "Date registered":
        item.filterActive
          ? setData(
            data?.sort(
              (a, b) =>
                // @ts-ignore
                new Date(a.registrationDateTime) -
                // @ts-ignore
                new Date(b.registrationDateTime)
            )
          )
          : setData(
            data?.sort(
              (a, b) =>
                // @ts-ignore
                new Date(b.registrationDateTime) -
                // @ts-ignore
                new Date(a.registrationDateTime)
            )
          );
        break;
      case "Status":
        item.filterActive
          ? setData(data?.sort((a, b) => Number(a.status) - Number(b.status)))
          : setData(data);
        break;
      case "Minted":
        item.filterActive
          ? setData(data?.sort((a, b) => Number(a.Minted) - Number(b.Minted)))
          : setData(data);
        break;

      default:
        break;
    }
  };
  const [selectAll, setSelectAll] = useState(false);
  // When the All button is clicked
  const handleAllSelect = () => {
    setSelectAll(!selectAll);
    const CheckAll = data?.map((element, index) => {
      if (element.Select === selectAll || !element.Select) {
        element.Select = selectAll;
        handleSelect(index);
      }
    });
  };

  const handleSelect = (index: number) => {
    // @ts-ignore
    const copy = [...data];
    let item = copy[index];

    !item.Select ? dispatch(increment()) : dispatch(decrement());
    item.Select = !item.Select;
    console.log("Selected", data);
    setData(copy);
  };

  const heads = headers.map((element, index) => (
    <th key={index} style={{ padding: element.name === "Select" ? 0 : 10 }}>
      <UnstyledButton
        style={{ display: "flex" }}
        onClick={() => {
          handleFilterActive(index);
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

  const rows = data?.map((element, index) => (
    <Suspense fallback={<Loading />}>
      <tr key={index}>
        {/* <td>{element.certificateCid}</td> */}
        <td>{element.deviceId}</td>
        <td>{element.model}</td>

        {/* <td>{element.customer}</td> */}
        <td>{element.country}</td>
        <td>{dayjs(element.registrationDateTime).format("YYYY-MM-DD")}</td>

        <td>
          <div style={{ display: "flex" }}>
            {/* {element.status} */}
            {element.status ? (
              <>
                Active <Tick style={{ paddingBottom: 2 }} />
              </>
            ) : (
              <>
                Offline <Inactive />
              </>
            )}
          </div>
        </td>
        <td>{element.Minted ? <Star /> : <></>}</td>
        <td
          style={{
            width: 3,
            padding: 0,
            paddingLeft: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Radio
            label={<></>}
            labelPosition="left"
            checked={element.Select}
            onClick={() => handleSelect(index)}
            size={"xs"}
          />
        </td>
        <td style={{ width: 0, padding: 0 }}></td>
      </tr>
    </Suspense>
  ));

  useEffect(() => {
    console.log("effect");
    handleFilterActive(3);
  }, []);

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
              INVENTORY
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
          scrollbarSize={14}
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
                    onClick={() => {
                      handleAllSelect();
                    }}
                  >
                    <Text style={{ fontSize: 12, color: palette.fullBlue }}>
                      All
                    </Text>
                  </UnstyledButton>
                </th>
              </tr>
            </thead>

            <tbody>{rows ? rows : <td colSpan={8}><Loading /></td>}</tbody>

          </Table>
        </ScrollArea>
      </Card>
    </Stack>
  );
}

export default InventoryList;
