import { tabletBreakpoint } from "@/constants/breakpoints";
import { WalletContext } from "@/context/wallet";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { connectWallet, disconnectWallet } from "@/redux/userSlice";
import { palette, shadow } from "@/theme/palette";
import { WALLET_TYPE } from "@/types/wallet";
import { Avatar, Button, Card, Group, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import DisconnectWallet from "./icons/disconnectWallet";
import Wallet from "./icons/wallet";

function ConnectedAccount() {
  const dispatch = useAppDispatch();
  const viewPortSize = useViewportSize();
  const router = useRouter();
  const { wallet, updateWalletType, logoutWallet } = useContext(WalletContext);
  const userAddress = wallet.user?.address;

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

  useEffect(() => {
    if (userAddress) {
      dispatch(connectWallet());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAddress]);

  if (userAddress) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          shadow={shadow.default}
          p="md"
          radius={16}
          withBorder
          style={{ width: viewPortSize.width >= tabletBreakpoint ? 312 : 358 }}
        >
          <Group position="apart" mt="md" mb="xs">
            <Text>Connected Account</Text>
          </Group>
          <Group
            style={{
              display: "flex",
              width: "100%",
              marginTop: 25,
              // justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                borderRadius: 23,
                height: 46,
                backgroundColor: palette.Neutral200,
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                paddingLeft: 15,
                paddingRight: 15,
              }}
            >
              <Wallet />
              <Text style={{ marginLeft: 10 }}>
                {truncate(userAddress, 24, ".....") || ""}
              </Text>
            </Text>
            <Avatar
              size={46}
              radius={30}
              variant="filled"
              style={{ cursor: "pointer", padding: 0, margin: 0 }}
              onClick={() => {
                dispatch(disconnectWallet());
                logoutWallet();
              }}
            >
              <DisconnectWallet />
            </Avatar>
          </Group>
        </Card>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          shadow={shadow.default}
          p="lg"
          radius={16}
          withBorder
          style={{ width: viewPortSize.width >= tabletBreakpoint ? 312 : 358 }}
        >
          <Group position="apart" mt="md" mb="xs">
            <Text style={{ fontSize: 16, fontWeight: 300 }}>
              Connect your Wallet to view your device data, assets and customer
              details.
            </Text>
          </Group>
          <div style={{ paddingTop: 30 }} />

          <Button
            onClick={() => {
              if (!wallet.user) {
                updateWalletType(WALLET_TYPE.keplr);
              } else {
                router.push("/dashboard");
              }
            }}
            w={"99%"}
            radius={23}
            leftIcon={<Wallet fill="#FFFFFF" />}
            h={46}
          >
            <Text style={{ fontWeight: 500, fontSize: 16 }}>
              Connect Wallet
            </Text>
          </Button>
        </Card>
      </div>
    );
  }
}

export default ConnectedAccount;
