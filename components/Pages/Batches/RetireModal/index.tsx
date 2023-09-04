import {
  Autocomplete,
  Button,
  Flex,
  Modal,
  Styles,
  Text,
  TextInput,
  TextInputStylesNames,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { CSSProperties } from "react";

import LeafIcon from "@/assets/icons/leaf.svg";
import BaseIcon from "@/components/Presentational/BaseIcon";
import { palette } from "@/theme/palette";
import shortStr from "@/utils/shortStr";

type Props = {
  isModalOpened: boolean;
  retired?: number;
  batchNumber?: number;
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
  retired,
  batchNumber,
}: Props) {
  const retireForm = useForm({
    // Initial values are mocked up until the requirements are met
    initialValues: {
      offsetAmount: 0,
      country: "",
      stateRegion: "",
      postalCode: "",
      note: "",
    },
    // Validations are placeholders, correct validations will be required later.
    validate: {
      offsetAmount: (value) => value <= 1_200_000 && value > 0,
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
    retireForm.setValues({ offsetAmount: retired });
    console.log("RetireForm values: ", retireForm.values);
  }

  function onOffsetModalClose() {
    retireForm.reset();
    closeModal();
  }

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
            {retired} CARBON
          </Text>{" "}
          credits in your selected batch (
          <Text display="inline" weight={800}>
            #{shortStr(String(batchNumber), 9, 3)}
          </Text>
          ).
          <Text>Please fill out the offset details.</Text>
        </Text>
        <Autocomplete
          radius="lg"
          size="md"
          styles={{
            dropdown: {
              maxHeight: 100,
              overflow: "hidden",
            },
            ...textInputStyles,
          }}
          label="Country"
          dropdownPosition="bottom"
          placeholder="Select country"
          // FIXME: EMERGING-196 Autocomplete needs to contain all countries in the world
          // as well as flag icons, use array that Petrus provided
          data={["Zambia", "South Africa", "Malawi"]}
          {...retireForm.getInputProps("country")}
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
          disabled
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
