import { palette } from "@/theme/palette";
import {
  Avatar,
  Button,
  Center,
  Divider,
  Group,
  NumberInput,
  Select,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import React, { forwardRef, useState } from "react";
import CoinsIcon from "./icons/coins-icon";
import CarbonIcon from "./icons/CryptoIcon/carbon-icon";
import IXOIcon from "./icons/CryptoIcon/ixo-icon";
import USDCIcon from "./icons/CryptoIcon/USDC-icon";
import MailIcon from "./icons/mail-icon";
import RecipientIcon from "./icons/recipient-icon";
import SendArrow from "./icons/sendArrow";

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  icon: string;
  label: string;
}

function SendCarbon(): JSX.Element {
  const viewPortSize = useViewportSize();

  const [available, setAvailable] = useState(1200000.0);
  const [value, setValue] = useState<number>();

  // eslint-disable-next-line react/display-name
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
        {/* Recipient */}
        <TextInput
          label="Recipient"
          placeholder="Paste Address"
          icon={<RecipientIcon />}
          iconWidth={50}
          variant="filled"
          radius={23}
          size="md"
        />
        {/* Token Drop down */}
        <Select
          label="Token"
          radius={16}
          variant="filled"
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
        {/* Amount */}
        <NumberInput
          style={styles.inputTopMarg}
          label={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: viewPortSize.width > 600 ? 365 : 318,
                paddingRight: 5,
              }}
            >
              <Text>Amount</Text>
              <Text
                style={{
                  textAlign: "right",
                  margin: 0,
                  padding: 0,
                  color: palette.Neutral500,
                }}
              >
                Available 1,200,000.000 IXO
              </Text>
            </div>
          }
          icon={<CoinsIcon />}
          iconWidth={50}
          placeholder="Enter Amount"
          hideControls
          radius={23}
          size="md"
          variant="filled"
          onChange={(value: any) => {
            if (value > available) {
              console.log("bigger");
              setValue(available);
            } else if (value < available) setValue(value);
          }}
          value={value}
          parser={(value: any) => value.replace(/\$\s?|(,*)/g, "")}
          formatter={(value: any) =>
            !Number.isNaN(parseFloat(value))
              ? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
              : ""
          }
          rightSectionWidth={60}
          rightSection={
            <Button
              compact
              radius={16}
              onClick={() => {
                setValue(available);
              }}
            >
              <Text style={{ fontWeight: 400 }}>MAX</Text>
            </Button>
          }
        />
        {/* Memo */}
        <TextInput
          style={styles.inputTopMarg}
          label="Memo (Optional)"
          placeholder="Enter Memo"
          icon={<MailIcon />}
          iconWidth={50}
          variant="filled"
          radius={23}
          size="md"
        />
        {/* Fees */}
        <Text style={styles.inputTopMarg}>Fee</Text>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            gap: 18,
          }}
        >
          <UnstyledButton
            style={{
              flex: 1,
              borderRadius: 16,
              backgroundColor: palette.Neutral200,
              textAlign: "center",
            }}
            h={80}
          >
            <Text>Low</Text>
            <Text style={styles.feesSmall}>$0.01</Text>
            <Text style={styles.feesSmall}>0.001 IXO</Text>
          </UnstyledButton>
          <UnstyledButton
            style={{
              flex: 1,
              borderRadius: 16,
              backgroundColor: palette.fullBlue,
              textAlign: "center",
              color: palette.White,
            }}
            h={80}
          >
            <Text>Average</Text>
            <Text style={styles.feesSmall}>$0.02</Text>
            <Text style={styles.feesSmall}>0.002 IXO</Text>
          </UnstyledButton>
          <UnstyledButton
            style={{
              flex: 1,
              borderRadius: 16,
              backgroundColor: palette.Neutral200,
              textAlign: "center",
            }}
            h={80}
          >
            <Text>High</Text>
            <Text style={styles.feesSmall}>$0.03</Text>
            <Text style={styles.feesSmall}>0.003 IXO</Text>
          </UnstyledButton>
        </div>

        {/* Send Button */}
        <div
          style={{ ...styles.inputTopMarg, width: "100%", paddingBottom: 10 }}
        >
          <Button
            radius={23}
            leftIcon={<SendArrow color={palette.White} />}
            fullWidth
            h={46}
          >
            <Text style={{ fontWeight: 400, fontSize: 16 }}>Send</Text>
          </Button>
        </div>
      </div>
    </Center>
  );
}

export default SendCarbon;

const styles: any = {
  feesSmall: { fontWeight: 400, fontSize: 14, textAlign: "center" },
  inputTopMarg: { marginTop: 20 },
};
