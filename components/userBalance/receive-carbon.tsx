import { palette } from "@/theme/palette";
import {
  Button,
  Center,
  Group,
  Modal,
  Popover,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
// import { PopoverDropdown } from "@mantine/core/lib/Popover/PopoverDropdown/PopoverDropdown";
// import { PopoverTarget } from "@mantine/core/lib/Popover/PopoverTarget/PopoverTarget";
import { useViewportSize } from "@mantine/hooks";
import React, { forwardRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
// import { ToastContainer } from "react-toastify/dist/components";
import Clipboard from "./icons/clipboard";
import CarbonIcon from "./icons/CryptoIcon/carbon-icon";
import IXOIcon from "./icons/CryptoIcon/ixo-icon";
import USDCIcon from "./icons/CryptoIcon/USDC-icon";
import QRCodeIcon from "./icons/QrCode";
import RecipientIcon from "./icons/recipient-icon";
import SendArrow from "./icons/sendArrow";
import QRCode from "react-qr-code";

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  icon: string;
  label: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ icon, label, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <div>{icon}</div>
        <div>
          <Text size="sm">{label}</Text>
        </div>
      </Group>
    </div>
  )
);
SelectItem.displayName = "SelectItem";

function ReceiveCarbon() {
  const viewPortSize = useViewportSize();
  const [clipText, setClipText] = useState("ixo12345409659itgruniondfoifnboif");
  const notify = () => toast("Wow so easy!");

  return (
    <Center>
      <div
        style={{
          width: viewPortSize.width > 600 ? 365 : 318,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        {/* Token Drop down */}
        <Select
          label={"Select coin to receive"}
          radius={16}
          variant={"filled"}
          itemComponent={SelectItem}
          h={46}
          data={[
            { value: "Carbon", label: "CARBON", icon: <CarbonIcon /> },
            { value: "USDC", label: "USDC", icon: <USDCIcon /> },
            { value: "IXO", label: "IXO", icon: <IXOIcon /> },
          ]}
          filter={(value, item) =>
            item.label?.toLowerCase().includes(value.toLowerCase().trim()) ||
            item.description.toLowerCase().includes(value.toLowerCase().trim())
          }
          style={styles.inputTopMarg}
        />
        {/* QR Code */}
        <Center style={{ ...styles.inputTopMarg, paddingTop: 28 }}>
          <QRCode value={"qr code"} size={165} />
        </Center>
        <Center style={styles.inputTopMarg}>
          <Text style={{ fontSize: 16, fontWeight: 600 }}>My ixo account</Text>
        </Center>

        {/* Recipient */}
        <TextInput
          disabled
          icon={<RecipientIcon />}
          iconWidth={50}
          variant="filled"
          radius={23}
          size="md"
          style={styles.inputTopMarg}
          rightSectionWidth={50}
          value={clipText}
          rightSection={
            <div>
              <Popover position="top" withArrow>
                <Popover.Dropdown>
                  <Text>Copied</Text>
                </Popover.Dropdown>
                <Popover.Target>
                  <Button
                    compact
                    radius={16}
                    h={34}
                    w={37}
                    onClick={() => {
                      navigator.clipboard.writeText(clipText);
                    }}
                  >
                    <Clipboard />
                  </Button>
                </Popover.Target>
              </Popover>
            </div>
          }
        />
        <div
          style={{ ...styles.inputTopMarg, width: "100%", paddingBottom: 10 }}
        >
          <Button radius={23} fullWidth h={46}>
            <Text style={{ fontWeight: 400, fontSize: 16 }}>Done</Text>
          </Button>
        </div>
      </div>
    </Center>
  );
}

export default ReceiveCarbon;

const styles: any = {
  feesSmall: { fontWeight: 400, fontSize: 14, textAlign: "center" },
  inputTopMarg: { marginTop: 20 },
};
