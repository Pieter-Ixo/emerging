import { BackgroundImage, Box, Container, Title } from "@mantine/core";
import { useRouter } from "next/navigation";

import useValueFromRouter from "@/utils/useValueFromRouter";
import ImageTextCard from "@/components/Presentational/ImageTextCard";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";
import Eye from "@/assets/icons/eye.svg";
import { palette } from "@/theme/palette";
import BaseIcon from "@/components/Presentational/BaseIcon";
import BaseDeviceCard from "@/components/Presentational/BaseDeviceCard";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect } from "react";
import { fetchEntityTransactions } from "@/redux/entityCollections/thunks";
import {
  selectEntityByExternalId,
  selectEntityTransactions,
} from "@/redux/entityCollections/selectors";
import TransactionTable from "@/components/Pages/Devices/TransactionsTable";

export default function DeviceTransactions() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const entityExternalId = useValueFromRouter<string>("entityId");
  const entityTransactions = useAppSelector(selectEntityTransactions);
  const entityByExternalId = useAppSelector((state) => {
    if (entityExternalId)
      return selectEntityByExternalId(state, entityExternalId);
    return undefined;
  });

  useEffect(() => {
    if (entityByExternalId && !entityTransactions) {
      dispatch(fetchEntityTransactions(entityByExternalId));
    }
  }, [entityExternalId]);

  return (
    <BackgroundImage src="/images/background.jpg">
      <Container maw="600px" mih="100vh" py="lg">
        <Title
          order={2}
          align="center"
          color={palette.White}
          weight={400}
          pb="lg"
        >
          Supamoto #{entityExternalId}
        </Title>
        <Box pos="relative" mb={28}>
          <ImageTextCard Img={Eye} text="Carbon Credit Transactions" />
          <BaseIcon
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              margin: "1em",
              cursor: "pointer",
            }}
            onClick={() => router.back()}
            Icon={ArrowLeftIcon}
          />
        </Box>
        <BaseDeviceCard title="TRANSACTIONS">
          {entityTransactions?.data && (
            <TransactionTable transactions={entityTransactions.data} />
          )}
        </BaseDeviceCard>
      </Container>
    </BackgroundImage>
  );
}
