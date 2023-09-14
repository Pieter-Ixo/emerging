import { Avatar, Box, Button, Flex, Text, Title } from "@mantine/core";

import ProgressBar from "@/components/Presentational/ProgressBar";
import useDetailPortal from "@/hooks/useDetailPortal";
import ProfileCard from "@/components/Containers/ProfileCard";
import VerifyIcon from "@/assets/icons/VerifyIcon";
import { palette } from "@/theme/palette";
import { IEntityExtended } from "@/types/entityCollections";

import { FieldText } from "../styledComponents";

type Props = {
  collectionAssetsAmount?: number;
  entity?: IEntityExtended;
  totalTokenAmount?: number;
  retired?: number;
  produced?: number;
  onVerifyClick: Function;
};

export default function Identifier({
  entity,
  collectionAssetsAmount,
  retired,
  totalTokenAmount,
  produced,
  onVerifyClick,
}: Props) {
  const { isVisible, openPortal, closePortal } = useDetailPortal("Identifier");
  const label = entity?.alsoKnownAs.split("}")[1];

  const PortalChild = (
    <>
      <ProfileCard
        entity={entity}
        measure={
          <>
            <Box>
              <ProgressBar
                totalTokenAmount={totalTokenAmount}
                retired={retired}
                produced={produced}
              />
            </Box>
            <Flex mt={50} direction="row" align="end" justify="space-between">
              <Flex gap={6} align="end">
                <Title
                  order={4}
                  c={palette.Black}
                  fw={700}
                  sx={{ lineHeight: 1.1 }}
                >
                  {entity?.alsoKnownAs.replace("{id}", "")}
                </Title>
                <Text color={palette.Neutral800} size="xs">
                  of {collectionAssetsAmount ?? 500}
                </Text>
              </Flex>
              <Avatar src={entity?._profile?.logoUrl} alt="" radius="xl" />
            </Flex>
          </>
        }
      />
      <Button
        onClick={() => onVerifyClick()}
        w={277}
        mt={40}
        h={46}
        radius="xl"
        leftIcon={<VerifyIcon />}
      >
        <Text fw={400} size="md">
          Verify
        </Text>
      </Button>
    </>
  );

  return (
    <Flex justify="space-between" align="center">
      <FieldText>Identifier</FieldText>
      <Button
        compact
        size="xs"
        radius="xl"
        onClick={() => (isVisible ? closePortal() : openPortal(PortalChild))}
        variant={isVisible ? "outline" : "subtle"}
      >
        {label}
      </Button>
    </Flex>
  );
}
