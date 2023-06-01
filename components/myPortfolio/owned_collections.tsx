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
} from "@mantine/core";

function OwnedCollections() {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Group position="apart" mt="md" mb="xs">
        <Text>Owned Collections</Text>
      </Group>
      <Grid>
        <Grid.Col span={1}>
          <Text
            style={{
              fontStyle: "normal",
              fontSize: 56,
              color: palette.fullBlue,
            }}
          >
            7
          </Text>
        </Grid.Col>
        <Grid.Col span={8}>
          <Text style={{ paddingTop: 18, paddingLeft: 8 }}>
            SupaMoto Malawi Collection 2022
          </Text>
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={1}>
          <Text
            style={{
              fontStyle: "normal",
              fontSize: 56,
              color: palette.fullBlue,
            }}
          >
            7
          </Text>
        </Grid.Col>
        <Grid.Col span={8}>
          <Text style={{ paddingTop: 18, paddingLeft: 8 }}>
            SupaMoto Malawi Collection 2022
          </Text>
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={1}>
          <Text
            style={{
              fontStyle: "normal",
              fontSize: 56,
              color: palette.fullBlue,
            }}
          >
            7
          </Text>
        </Grid.Col>
        <Grid.Col span={8}>
          <Text style={{ paddingTop: 18, paddingLeft: 8 }}>
            SupaMoto Malawi Collection 2022
          </Text>
        </Grid.Col>
      </Grid>
    </Card>
  );
}

export default OwnedCollections;
