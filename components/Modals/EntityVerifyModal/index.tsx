import BaseIcon from "@/components/Presentational/BaseIcon";
import { palette } from "@/theme/palette";
import { Button, Flex, Modal, Text } from "@mantine/core";
import VerifiedIcon from "@/assets/icons/verified-icon.svg";
import ArrowRightIcon from "@/assets/icons/arrow-right.svg";

type Props = {
  isModalOpened: boolean;
  closeModal: () => void;
};

export default function EntityVerifyModal({
  isModalOpened,
  closeModal,
}: Props) {
  return (
    <Modal
      padding="lg"
      radius="lg"
      size="sm"
      opened={isModalOpened}
      onClose={closeModal}
      title="Verify Entity"
      centered
      styles={{ header: { color: palette.accentActive } }}
    >
      <Flex py="xl" justify="space-between" align="center">
        <Text>Checking entity verification...</Text>
        <Text>
          verified <BaseIcon fill={palette.greenFull} Icon={VerifiedIcon} />
        </Text>
      </Flex>
      <Text pb="xl" color={palette.greenFull}>
        The entity is verified.
      </Text>
      <Button
        w="100%"
        h={46}
        radius="xl"
        ta="start"
        bg={palette.accentActive}
        fw={300}
        sx={{
          ":hover": { backgroundColor: palette.accentHover },
          fontSize: 16,
          display: "flex",
          justifyContent: "flex-start",
        }}
        leftIcon={
          <BaseIcon
            width={24}
            height={24}
            fill={palette.White}
            Icon={ArrowRightIcon}
          />
        }
      >
        Continue
      </Button>
    </Modal>
  );
}
