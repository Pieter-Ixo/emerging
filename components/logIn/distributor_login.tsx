import { shadow } from "@/theme/palette";
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

import Van from "./icons/van";

function DistributorLogin() {
  return (
    <Card shadow={shadow.default} p="lg" radius="md" h={158}>
      <Van
        style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
      />
      <Text
        style={{
          textAlign: "center",
          fontWeight: "300",
          fontSize: 32,
        }}
      >
        Distributor
      </Text>
    </Card>
  );
}

export default DistributorLogin;
