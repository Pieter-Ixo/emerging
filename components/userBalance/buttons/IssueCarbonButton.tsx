import { Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { palette } from "@/theme/palette";

import DownArrow from "../icons/downArrow";
import { ImpactCreditsButtonBlue } from "../styled-buttons";

type Props = {
  totalClaimable: number | string;
  assetsLength: number;
};

export default function IssueCarbonButton({
  totalClaimable,
  assetsLength,
}: Props) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <ImpactCreditsButtonBlue leftIcon={<DownArrow />} onClick={() => open()}>
        {totalClaimable} CARBON to isssue
      </ImpactCreditsButtonBlue>
      <Modal
        opened={opened}
        onClose={close}
        title="Issue CARBON"
        centered
        styles={{ header: { color: palette.fullBlue } }}
      >
        <Text mb="xl">
          You will issue {totalClaimable} CARBON Credits to {assetsLength}{" "}
          Impact Assets.{" "}
        </Text>
        <ImpactCreditsButtonBlue>Sign</ImpactCreditsButtonBlue>
      </Modal>
    </>
  );
}
