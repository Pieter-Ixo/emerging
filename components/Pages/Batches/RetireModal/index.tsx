import {
  Button,
  Flex,
  Modal,
  Styles,
  Text,
  TextInput,
  TextInputStylesNames,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { CSSProperties, useContext, useEffect } from "react";

import LeafIcon from "@/assets/icons/leaf.svg";
import BaseIcon from "@/components/Presentational/BaseIcon";
import { palette } from "@/theme/palette";
import shortStr from "@/utils/shortStr";
import { IRetireFormData, ImpactToken } from "@/types/certificates";
import CountryPicker from "@/components/Presentational/CountryPicker";
import countryPickerData from "@/constants/countryPickerData";
import { WalletContext } from "@/context/wallet";
import generateRetireTokenTrx from "@/helpers/batches/transactions";
import { ChainContext } from "@/context/chain";
import { broadCastMessages } from "@/utils/wallets";
import { useAppSelector } from "@/hooks/redux";
import { selectConnectedWallet } from "@/redux/selectors";

type Props = {
  isModalOpened: boolean;
  offset?: number;
  batchId?: string;
  closeModal: () => void;
};

const textInputStyles: Styles<TextInputStylesNames, CSSProperties> = {
  root: {
    position: "relative",
    minHeight: 75,
  },
  input: {
    borderColor: palette.fullBlue,
  },
  error: {
    fontSize: 12,
    paddingLeft: 10,
  },
  label: {
    position: "absolute",
    top: -7,
    left: 15,
    backgroundColor: palette.White,
    color: palette.fullBlue,
    zIndex: 2,
    padding: "0 5px",
    fontSize: 12,
  },
};

export default function RetireModal({
  isModalOpened,
  closeModal,
  offset,
  batchId,
}: Props) {
  const { chainInfo } = useContext(ChainContext);
  const { wallet } = useContext(WalletContext);
  const userWallet = useAppSelector(selectConnectedWallet);
  const retireForm = useForm<IRetireFormData>({
    // Initial values are mocked up until the requirements are met
    initialValues: {
      country: "",
      stateRegion: "",
      postalCode: "",
      note: "",
    },
    // Validations are placeholders, correct validations will be required later.
    validate: {
      country: (value) => (value ? null : "Country required"),
      stateRegion: (value) =>
        value.trim().length > 10 ? "Invalid state or region" : null,
      postalCode: (value) =>
        value.trim().length > 10 ? "Postal code is too long" : null,
      note: (value) => (value.trim().length > 200 ? "Note is too long" : null),
    },
  });

  // FIXME: EMERGING-196 submit actions need to be discussed
  function onOffsetFormSubmit() {
    const isRetireValid = offset && offset > 0 && offset <= 1_200_000;
    if (!isRetireValid || !batchId || !userWallet) return;

    const countryCode = countryPickerData.find(
      (country) => country.name === retireForm.values.country
    )?.code;

    const tokens: ImpactToken[] = [{ id: batchId, amount: offset.toString() }];

    if (userWallet && chainInfo && wallet.user?.address) {
      const retireTokenTrx = generateRetireTokenTrx({
        jurisdiction: countryCode,
        tokens,
        owner: userWallet,
      });

      // TODO: Mocked broadcast method, used params must be rewritten to Redux
      // const result = broadCastMessages(
      //   wallet,
      //   [retireTokenTrx],
      //   undefined,
      //   "average",
      //   "uixo",
      //   chainInfo
      // );
    }
  }

  function onOffsetModalClose() {
    retireForm.reset();
    closeModal();
  }

  useEffect(() => {
    console.log("🦍 Cached value: ", userWallet);
    console.log("🦍 Not cached value: ", { wallet, chainInfo });
  });

  return (
    <Modal
      opened={isModalOpened}
      onClose={() => onOffsetModalClose()}
      title="Offset Batch"
      radius="lg"
      centered
      styles={{ header: { color: palette.fullBlue } }}
    >
      <form onSubmit={retireForm.onSubmit(() => onOffsetFormSubmit())}>
        <Text pt="lg" mb="lg">
          This action will retire a total of{" "}
          <Text display="inline" weight={800}>
            {offset} CARBON
          </Text>{" "}
          credits in your selected batch (
          <Text display="inline" weight={800}>
            #{shortStr(String(batchId), 9, 3)}
          </Text>
          ).
          <Text>Please fill out the offset details.</Text>
        </Text>
        <CountryPicker<IRetireFormData>
          form={retireForm}
          formField="country"
          countryPickerStyles={textInputStyles}
        />
        <Flex gap="xl">
          <TextInput
            styles={textInputStyles}
            radius="lg"
            size="md"
            label="State / Region (Optional)"
            placeholder="Enter state"
            {...retireForm.getInputProps("stateRegion")}
          />
          <TextInput
            radius="lg"
            styles={{
              ...textInputStyles,
            }}
            size="md"
            label="Postal Code (Optional)"
            placeholder="Enter Postal Code"
            {...retireForm.getInputProps("postalCode")}
          />
        </Flex>
        <TextInput
          radius="lg"
          styles={textInputStyles}
          size="md"
          label="Note (Optional)"
          placeholder="Offset on behalf of"
          {...retireForm.getInputProps("note")}
        />
        <Button
          leftIcon={
            <BaseIcon
              width={37}
              height={37}
              status="disabled"
              Icon={LeafIcon}
            />
          }
          disabled={!retireForm.values.country}
          type="submit"
          w="100%"
          radius="lg"
          size="md"
          fw={400}
          h={46}
        >
          Sign to Offset
        </Button>
      </form>
    </Modal>
  );
}
