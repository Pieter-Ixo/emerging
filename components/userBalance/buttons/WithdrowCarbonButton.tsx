import { Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { palette } from "@/theme/palette";
import Generated from "@/icons/generated";

import { ImpactCreditsButtonBlue } from "../styled-buttons";

type Props = {
  totalClaimable: number | string;
  assetsLength: number;
};

export default function WithdrowCarbonButton({
  totalClaimable,
  assetsLength,
}: Props) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <ImpactCreditsButtonBlue
        leftIcon={<Generated fill={palette.White} />}
        onClick={() => open()}
      >
        {totalClaimable} CARBON to withdrow
      </ImpactCreditsButtonBlue>
      <Modal
        opened={opened}
        onClose={close}
        title="Issue CARBON"
        centered
        styles={{ header: { color: palette.fullBlue } }}
      >
        <Text mb="xl">
          You will withdraw {totalClaimable} CARBON Credits from {assetsLength}{" "}
          Impact Assets to your account.
        </Text>
        <ImpactCreditsButtonBlue>Sign</ImpactCreditsButtonBlue>
      </Modal>
    </>
  );
}
