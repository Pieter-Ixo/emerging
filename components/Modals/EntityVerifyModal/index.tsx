import BaseIcon from "@/components/Presentational/BaseIcon";
import { palette } from "@/theme/palette";
import { Button, Flex, Modal, Text } from "@mantine/core";
import VerifiedIcon from "@/assets/icons/verified-icon.svg";
import ArrowRightIcon from "@/assets/icons/arrow-right.svg";
import NotVerifiedIcon from "@/assets/icons/not-verified.svg";
import { useAppSelector } from "@/hooks/redux";
import {
  selectEntityVerified,
  selectEntityVerifiedError,
  selectEntityVerifiedLoading,
} from "@/redux/entityCollections/selectors";

type Props = {
  isModalOpened: boolean;
  closeModal: () => void;
};

export default function EntityVerifyModal({
  isModalOpened,
  closeModal,
}: Props) {
  const entityVerified = useAppSelector(selectEntityVerified);
  const entityVerifiedLoading = useAppSelector(selectEntityVerifiedLoading);
  const entityVerifiedError = useAppSelector(selectEntityVerifiedError);

  const verificationText = entityVerified ? "verified" : "Not Verified";
  const entityValidText = entityVerified
    ? "The entity is verified."
    : "The Credential is invalid.";

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

        <Flex gap={5} align="center">
          {verificationText}
          {entityVerified ? (
            <BaseIcon fill={palette.greenFull} Icon={VerifiedIcon} />
          ) : (
            <BaseIcon fill={palette.redFull} Icon={NotVerifiedIcon} />
          )}
        </Flex>
      </Flex>
      <Text
        pb="xl"
        color={entityVerified ? palette.greenFull : palette.orangeFull}
      >
        {entityValidText}
      </Text>
      <Button
        w="100%"
        h={46}
        radius="xl"
        onClick={closeModal}
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
