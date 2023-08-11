import { ActionIcon, Button, Card, Flex, Group, Text } from "@mantine/core";
import { useContext, useEffect } from "react";

import shortStr from "@/utils/shortStr";
import { WalletContext } from "@/context/wallet";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { connectWallet, disconnectWallet } from "@/redux/userSlice";
import { palette } from "@/theme/palette";
import { WALLET_TYPE } from "@/types/wallet";

import WalletIcon from "@/icons/wallet";
import DisconnectWalletIcon from "@/icons/disconnectWallet";

function ConnectAccountButton() {
  const dispatch = useAppDispatch();
  const { wallet, updateWalletType, logoutWallet } = useContext(WalletContext);
  const contextUserAddress = wallet.user?.address;
  const userAddress = useAppSelector((state) => state.user.connectedWallet);

  useEffect(() => {
    if (contextUserAddress) {
      dispatch(connectWallet(contextUserAddress));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextUserAddress]);

  if (userAddress) {
    return (
      <Card p="lg" radius={16}>
        <Flex direction="column" gap={30}>
          <Text>Connected Account</Text>
          <Flex align="center" justify="space-between" gap={8}>
            <Flex
              justify="space-around"
              align="center"
              px="xs"
              style={{
                borderRadius: 23,
                height: 46,
                backgroundColor: palette.Neutral200,
              }}
            >
              <WalletIcon />
              <Text ml="sm" style={{ overflow: "clip" }}>
                {shortStr(userAddress, 21, 10, "...") || "..."}
              </Text>
            </Flex>
            <ActionIcon
              variant="transparent"
              w="50px"
              h="50px"
              onClick={() => {
                dispatch(disconnectWallet());
                logoutWallet();
              }}
            >
              <DisconnectWalletIcon />
            </ActionIcon>
          </Flex>
        </Flex>
      </Card>
    );
  }
  return (
    <Card p="lg" radius={16} w="100%">
      <Group position="apart">
        <Text style={{ fontSize: 16, fontWeight: 300 }}>
          Connect your Wallet to view your device data, assets and customer
          details.
        </Text>
      </Group>
      <div style={{ paddingTop: 30 }} />

      <Button
        onClick={() => {
          if (!wallet.user) updateWalletType(WALLET_TYPE.walletConnect);
        }}
        w="99%"
        radius={23}
        leftIcon={<WalletIcon fill="#FFFFFF" />}
        h={46}
      >
        Connect My Account
      </Button>
    </Card>
  );
}

export default ConnectAccountButton;
