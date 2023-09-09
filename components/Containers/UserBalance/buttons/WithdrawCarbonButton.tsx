import { Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { palette } from "@/theme/palette";
import BaseIcon from "@/components/Presentational/BaseIcon";
import Generated from "@/assets/icons/generated.svg";

import { ImpactCreditsButtonBlue } from "../StyledButtons";

type Props = {
  totalClaimable: number | string;
  assetsLength: number;
};

export default function WithdrawCarbonButton({
  totalClaimable,
  assetsLength,
}: Props) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <ImpactCreditsButtonBlue
        leftIcon={
          <BaseIcon
            Icon={Generated}
            width={25}
            height={24}
            fill={palette.White}
          />
        }
        onClick={() => open()}
      >
        {totalClaimable} CARBON to withdraw
      </ImpactCreditsButtonBlue>
      <Modal
        opened={opened}
        onClose={close}
        title="Issue CARBON"
        centered
        styles={{ header: { color: palette.accentActive } }}
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
