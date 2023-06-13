import { WalletContext } from "@/context/wallet";
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
  Modal,
  Button,
  SegmentedControl,
} from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { useQRCode } from "next-qrcode";
import DownArrow from "../userBalance/icons/downArrow";
import Ixo from "./icons/ixo";
import wcLogo from "../../public/WalletConnect-logo.png";

function ConnectMyWallet(uri: string) {
  const [opened, setOpened] = useState(true);
  const { wallet } = useContext(WalletContext);
  const { Canvas } = useQRCode();
  const [mobileDesktop, setMobileDesktop] = useState(false) // false is mobile, true is desktop


  console.log(`mobDesk: ${  mobileDesktop}`)

  return (
    <Modal
      opened
      onClose={() => setOpened(false)}
      title="CONNECT YOUR WALLET"
      radius={16}
      // style={{marginLeft: 70}}
    >
      <Divider my="sm" />
      <Text
        style={{
          textAlign: "center",

          fontWeight: "normal",
          fontSize: 16,
        }}
      >
        How do you wish to connect?
      </Text>
      <div style={{ paddingLeft: 65, paddingTop: 25 }}>
        <SegmentedControl
          color={palette.fullBlue}
          style={{ borderRadius: 23, width: 272 }}
          radius={20}
          // onChange={() => {
          //   setAvailable(!available);
          // }}
          onChange={() => {
            setMobileDesktop(!mobileDesktop)
            
          }}
          data={[
            { label: "Available", value: "react" },
            { label: "Offset", value: "ng" },
          ]}
        />
      </div>

      {/* {mobileDesktop === false ?
       
       : 
       
      } */}

      <Text
        style={{
          textAlign: "center",
          paddingTop: 20,

          fontSize: 16,
        }}
      >
        <Text
          style={{ display: "inline", fontWeight: "bold", paddingRight: 5 }}
        >
          Scan
        </Text>
        this WalletConnect QR code to{"\n"}
      </Text>
      <Text style={{ textAlign: "center", paddingBottom: 20 }}>
        connect your mobile wallet
      </Text>
      <Group style={{ alignItems: "center", justifyContent: "center" }}>
        <>
          <Canvas
            text={uri}
            options={{
              level: "L",
              margin: 2,
              scale: 5,
              width: 250,
              color: {
                dark: "#00000a",
                light: "#ffffff",
              },
            }}
            logo={{
              src: wcLogo.src,
              options: {
                width: 35,
              },
            }}
          />
        </>
      </Group>
      <Text
        style={{
          textAlign: "center",
          paddingTop: 20,
          paddingBottom: 20,
          fontWeight: "normal",
          fontSize: 16,
        }}
      >
        Plays well with Impact X for iOS or Android
      </Text>
      <div style={{ paddingTop: 12, paddingLeft: 65 }}>
        <Button
          leftIcon={<Ixo />}
          style={{
            borderRadius: 18,
            backgroundColor: palette.fullBlue,
            width: 272,
          }}
        >
          Get the mobile App
        </Button>
      </div>
    </Modal>
  );
}

export default ConnectMyWallet;
