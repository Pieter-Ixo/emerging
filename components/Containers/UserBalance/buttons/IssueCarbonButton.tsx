import { Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { palette } from "@/theme/palette";

import DownArrow from "@/assets/icons/down-arrow.svg";
import BaseIcon from "@/components/Presentational/BaseIcon";

import { ImpactCreditsButtonBlue } from "../StyledButtons";

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
      <ImpactCreditsButtonBlue
        leftIcon={
          <BaseIcon
            isPointer
            width={24}
            height={24}
            fill={palette.White}
            Icon={DownArrow}
          />
        }
        onClick={() => open()}
      >
        {totalClaimable} CARBON to issue
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
