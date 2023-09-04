import { Autocomplete, Button, Modal, ScrollArea, Text } from "@mantine/core";

import LeafIcon from "@/assets/icons/leaf.svg";
import BaseIcon from "@/components/Presentational/BaseIcon";
import { palette } from "@/theme/palette";

type Props = {
  isModalOpened: boolean;
  retired?: number;
  batchNumber?: string;
  closeModal: () => void;
};

export default function RetireModal({
  isModalOpened,
  closeModal,
  retired,
  batchNumber,
}: Props) {
  return (
    <Modal
      opened={isModalOpened}
      onClose={closeModal}
      title="Retired"
      radius="lg"
      centered
      styles={{ header: { color: palette.fullBlue } }}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <Text pt="lg" mb="xl">
        This action will retire a total of{" "}
        <Text display="inline" weight={800}>
          {retired} CARBON
        </Text>{" "}
        credits in your selected batch (
        <Text display="inline" weight={800}>
          #{batchNumber}
        </Text>
        ).
        <Text>
          In which country would you prefer these to be recorded as Carbon
          Offsets?
        </Text>
      </Text>

      <Autocomplete
        radius="lg"
        pb="xl"
        size="md"
        label="Country"
        dropdownPosition="bottom"
        placeholder="Select country"
        data={["Zambia", "South Africa", "Malawi"]}
      />

      <Button
        leftIcon={
          <BaseIcon width={37} height={37} status="disabled" Icon={LeafIcon} />
        }
        disabled
        w="100%"
        radius="lg"
        size="md"
        fw={400}
        h={46}
      >
        Sign to Retired
      </Button>
    </Modal>
  );
}
