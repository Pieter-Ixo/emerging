import { BackgroundImage, Box, Container, Title } from "@mantine/core";
import { useEffect } from "react";

import useValueFromRouter from "@/utils/useValueFromRouter";
import ImageTextCard from "@/components/Presentational/ImageTextCard";
import Eye from "@/assets/icons/eye.svg";
import { palette } from "@/theme/palette";
import DeviceDashboardCard from "@/components/Presentational/DeviceDashboardCard";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  fetchEntityByExternalIdAndFill,
  fetchEntityTransactions,
} from "@/redux/entityCollections/thunks";
import {
  selectEntityTransactions,
  selectSelectedEntity,
} from "@/redux/entityCollections/selectors";
import TransactionTable from "@/components/Pages/Devices/TransactionsTable";
import DeviceDashboardFooter from "@/components/Presentational/DeviceDashboardFooter";
import ArrowBackLink from "@/components/Layout/ArrowBackLink";

export default function DeviceTransactions() {
  const dispatch = useAppDispatch();

  const entityExternalId = useValueFromRouter<string>("entityId");
  const entityTransactions = useAppSelector(selectEntityTransactions);
  const entity = useAppSelector(selectSelectedEntity);

  useEffect(() => {
    if (entityExternalId)
      dispatch(fetchEntityByExternalIdAndFill(entityExternalId));
  }, [entityExternalId]);

  useEffect(() => {
    if (entity && !entityTransactions)
      dispatch(fetchEntityTransactions(entity));
  }, [entity]);

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
          <ArrowBackLink
            link={`/devices/${entityExternalId}`}
            styles={{ top: 0, right: 0, margin: "1em" }}
          />
        </Box>
        <DeviceDashboardCard title="TRANSACTIONS">
          {entityTransactions?.data && (
            <TransactionTable transactions={entityTransactions.data} />
          )}
        </DeviceDashboardCard>
        <DeviceDashboardFooter />
      </Container>
    </BackgroundImage>
  );
}
