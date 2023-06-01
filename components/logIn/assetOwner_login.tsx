import { shadow } from "@/theme/palette";
import {
  Card,
  Image,
  Text,
} from "@mantine/core";

import Leaf from "./icons/leaf";

function AssetOwnerLogin() {
  return (
    <Card shadow={shadow.default} radius="md"  w={400} h={158} style={{paddingTop:35}}>
      <Leaf
        style={{ display: "block", marginLeft: "auto", marginRight: "auto"}}
      />
      <Text
        style={{
          textAlign: "center",
          marginTop:10,
          fontWeight: "300",
          fontSize: 32,
        }}
      >
        Asset Owner
      </Text>
    </Card>
  );
}

export default AssetOwnerLogin;
