import { palette } from "@/theme/palette";
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Grid,
  Col,
  SegmentedControl,
  Modal,
  Radio,
  Divider,
} from "@mantine/core";
import { useState } from "react";
import ImpactsLeaf from "../emergingAssets/icons/ImpactsLeaf";
import ButtonLeaf from "../userBalance/icons/buttonLeaf";
import Calculate from "../userBalance/icons/calulate";
import DownArrow from "../userBalance/icons/downArrow";
import ReceiveArrow from "../userBalance/icons/receiveArrow";
import SendArrow from "../userBalance/icons/sendArrow";
import Cross from "./icons/cross";
import FilterIcon from "./icons/filterIcon";

function Filter() {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title="FILTER">
        <Divider my="sm" style={{ paddingBottom: 10 }} />
        <Text
          style={{
            textAlign: "left",
            fontWeight: 300,
            fontSize: 24,
          }}
        >
          Country
        </Text>

        <Grid>
          <Grid.Col span={6}>
            <Radio label="Zambia" style={{ paddingTop: 20 }} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Radio label="Malawi" style={{ paddingTop: 20 }} />
          </Grid.Col>
        </Grid>
        <Radio label="Mozambique" style={{ paddingTop: 20 }} />
        <Divider
          my="sm"
          style={{ paddingBottom: 10 }}
          color={palette.Neutral100}
        />

        <Text
          style={{
            textAlign: "left",
            fontWeight: 300,
            fontSize: 24,
          }}
        >
          Status
        </Text>

        <Grid>
          <Grid.Col span={6}>
            <Radio label="Active" style={{ paddingTop: 20 }} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Radio label="Reposessed" style={{ paddingTop: 20 }} />
          </Grid.Col>
        </Grid>
        <Divider
          my="sm"
          style={{ paddingBottom: 10 }}
          color={palette.Neutral100}
        />

        <Text
          style={{
            textAlign: "left",
            fontWeight: 300,
            fontSize: 24,
          }}
        >
          Ownership
        </Text>

        <Grid>
          <Grid.Col span={6}>
            <Radio label="Assigned" style={{ paddingTop: 20 }} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Radio label="Vacant" style={{ paddingTop: 20 }} />
          </Grid.Col>
        </Grid>
        <Divider
          my="sm"
          style={{ paddingBottom: 10 }}
          color={palette.Neutral100}
        />

        <Text
          style={{
            textAlign: "left",
            fontWeight: 300,
            fontSize: 24,
          }}
        >
          Customer Group
        </Text>

        <Grid>
          <Grid.Col span={6}>
            <Radio label="Utility" style={{ paddingTop: 20 }} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Radio label="Non-utility" style={{ paddingTop: 20 }} />
          </Grid.Col>
        </Grid>
        <Radio label="Test" style={{ paddingTop: 20 }} />
        <Divider
          my="sm"
          style={{ paddingBottom: 10 }}
          color={palette.Neutral100}
        />

        <Grid style={{ paddingTop: 20, paddingLeft: 45, paddingRight: 28 }}>
          <Grid.Col span={6}>
            <Button
              leftIcon={<FilterIcon />}
              style={{
                borderRadius: 18,
                backgroundColor: palette.Neutral200,
                width: 122,
              }}
            >
              <Text style={{ color: palette.Black }}>Apply</Text>
            </Button>
          </Grid.Col>
          <Grid.Col span={6}>
            <Button
              leftIcon={<Cross />}
              style={{
                borderRadius: 18,
                backgroundColor: palette.Neutral200,
                width: 122,
              }}
            >
              <Text style={{ color: palette.Black }}>Clear all</Text>
            </Button>
          </Grid.Col>
        </Grid>
      </Modal>

      <Group position="center">
        <Button
          variant="light"
          color={"Grey"}
          size="md"
          leftIcon={<FilterIcon />}
          onClick={() => setOpened(true)}
          radius={23}
        >
          <Text style={{ fontSize: 15, color: "black" }}>Filter</Text>
        </Button>
      </Group>
    </>
  );
}

export default Filter;
