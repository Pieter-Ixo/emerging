import { MouseEvent } from "react";
import { useRouter } from "next/router";
import { Button, Flex, Sx, Text } from "@mantine/core";

import { palette } from "@/theme/palette";

import BaseIcon from "@/components/Presentational/BaseIcon";
import Batch1 from "@/assets/icons/batch-1.svg";
import Batch2 from "@/assets/icons/batch-2.svg";
import Batch3 from "@/assets/icons/batch-3.svg";

import BatchIdentifier from "@/components/Containers/BatchIdentifier";

import BatchButton from "../BatchButton";
import AstroBatchImage from "../AstroBatchImage";
import BatchProgress from "../BatchProgress";

type Props = {
  name?: string;
  batchId?: string;
  amount?: number;
  minted?: number;
  retired?: number;
  entityId?: string;
  onBatchClick: (
    offset: number | undefined,
    batchId: string | undefined
  ) => void;
};

export default function BatchesItem({
  name,
  batchId,
  minted,
  amount,
  retired,
  entityId,
  onBatchClick,
}: Props) {
  const router = useRouter();

  const isProgressComplete = retired === minted;

  const batchBackgroundImage = isProgressComplete
    ? "url(/images/bg/certificate-bg--disabled.png)"
    : "url(/images/bg/certificate-bg.png)";

  const toSingleBatch = () => {
    const redirectUrl = `/entity/${entityId}/batch/${batchId}`;

    router.push(redirectUrl);
  };

  const onOffsetBtnClick = (e: MouseEvent<any>) => {
    e.stopPropagation();

    if (amount !== undefined)
      onBatchClick(amount, batchId);
  };

  const buttonStyles: Sx = isProgressComplete
    ? {
        cursor: "default",
        pointerEvents: "none",
        backgroundColor: palette.Neutral800,
        ":hover": { backgroundColor: palette.Neutral800 },
      }
    : {};

  return (
    <Flex
      onClick={() => toSingleBatch()}
      direction="column"
      justify="center"
      gap={10}
      py="1rem"
      px="2rem"
      sx={{
        position: "relative",
        backgroundImage: batchBackgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        maxHeight: 352,
        borderRadius: 16,
        cursor: "pointer",
      }}
    >
      <Flex direction="column" gap={10} justify="center">
        <Text
          fw={700}
          color={palette.White}
          align="center"
          sx={{
            fontFamily: "Quicksand",
            fontSize: "14px",
            letterSpacing: "0.1rem",
            textTransform: "uppercase",
          }}
        >
          Verified Emission Reduction
        </Text>
        <BatchIdentifier
          isProgressComplete={isProgressComplete}
          name="CARBON"
          batchId={batchId}
        />
      </Flex>

      <Flex align="center" justify="space-between" gap={10}>
        <AstroBatchImage />
        <BatchProgress retired={retired} amount={amount} minted={minted} />
      </Flex>

      <Flex gap="sm" justify="center" align="center" direction="row">
        <BatchButton>
          <BaseIcon fill={palette.White} width={24} height={25} Icon={Batch1} />
        </BatchButton>
        <BatchButton>
          <BaseIcon fill={palette.White} width={24} height={25} Icon={Batch2} />
        </BatchButton>
        <BatchButton>
          <BaseIcon fill={palette.White} width={24} height={25} Icon={Batch3} />
        </BatchButton>
        <Button
          onClick={(e) => onOffsetBtnClick(e)}
          sx={{ flexGrow: 1, ...buttonStyles }}
          radius="xl"
          h={45}
        >
          {isProgressComplete ? "Fully Retired" : "Retire Credits"}
        </Button>
      </Flex>
    </Flex>
  );
}
