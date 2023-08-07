import { MouseEvent } from "react";
import { useRouter } from "next/router";
import { Button, Flex, Sx, Text } from "@mantine/core";

import { palette } from "@/theme/palette";

import Icon1 from "@/icons/batches/Icon1";
import Icon2 from "@/icons/batches/Icon2";
import Icon3 from "@/icons/batches/Icon3";

import BatchIdentifier from "@/components/Containers/BatchIdentifier";

import BatchButton from "../BatchButton";
import AstroBatchImage from "../AstroBatchImage";
import BatchProgress from "../BatchProgress";

type Props = {
  name?: string;
  index?: string;
  offset?: number;
  amount?: number;
  minted?: number;
  retired?: number;
  entityId?: string;
};

export default function BatchesItem({
  name,
  index,
  offset,
  minted,
  amount,
  retired,
  entityId,
}: Props) {
  const router = useRouter();

  const isProgressComplete = !!(minted && retired === minted);

  const isBatchHasProgress = !!(amount === 0 && (retired || 0) > 0);

  const batchBackgroundImage = isBatchHasProgress
    ? "url(/images/cert-bg--disabled.png)"
    : "url(/images/cert-bg.png)";

  const toSingleBatch = () => {
    const redirectUrl = `/entity/${entityId}/batch/${index}`;

    router.push(redirectUrl);
  };

  const onOffsetBtnClick = (e: MouseEvent<any>) => {
    e.stopPropagation();
  };

  const buttonStyles: Sx = isProgressComplete
    ? {
        cursor: "default",
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
          index={index}
        />
      </Flex>

      <Flex align="center" justify="space-between" gap={10}>
        <AstroBatchImage />
        <BatchProgress retired={retired} amount={amount} minted={minted} />
      </Flex>

      <Flex gap="sm" justify="center" align="center" direction="row">
        <BatchButton>
          <Icon1 />
        </BatchButton>
        <BatchButton>
          <Icon2 />
        </BatchButton>
        <BatchButton>
          <Icon3 />
        </BatchButton>
        <Button
          onClick={(e) => onOffsetBtnClick(e)}
          sx={{ flexGrow: 1, ...buttonStyles }}
          radius="xl"
          h={45}
        >
          {isProgressComplete ? "Fully Offset" : "Offset Batch"}
        </Button>
      </Flex>
    </Flex>
  );
}