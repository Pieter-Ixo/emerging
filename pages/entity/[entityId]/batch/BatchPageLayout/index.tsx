import { useEffect, useState } from "react";
import { Container, Grid, Title } from "@mantine/core";

import { palette } from "@/theme/palette";
import { IBatch } from "@/types/certificates";
import useValueFromRouter from "@/utils/useValueFromRouter";
import DetailPortalContext from "@/context/detailPortalContext";
import byKey from "@/helpers/byKey";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchBatchById } from "@/redux/batches/thunks";
import {
  fetchAndFillCollections,
  fetchEntityByExternalIdAndFill,
} from "@/redux/entityCollections/thunks";
import {
  selectCollectionAssetsCount,
  selectOnlyCollection,
  selectSelectedEntity,
} from "@/redux/entityCollections/selectors";
import { selectSelectedBatch } from "@/redux/batches/selectors";

import HeaderCard from "./FieldsGroups/HeaderCard";
import ImpactAsset from "./FieldsGroups/ImpactAsset";
import ImpactClaim from "./FieldsGroups/ImpactClaim";
import CleanEnergyDevice from "./FieldsGroups/CleanEnergyDevice";
import Project from "./FieldsGroups/Project";
import ImpactProducer from "./FieldsGroups/ImpactProducer";
import Evaluator from "./FieldsGroups/Evaluator";
import DetailCard from "./DetailCard";

export default function BatchPageLayout() {
  const dispatch = useAppDispatch();
  const [key, setKey] = useState<string | null>(null);
  const batch = useAppSelector(selectSelectedBatch);
  const entity = useAppSelector(selectSelectedEntity);
  const collection = useAppSelector(selectOnlyCollection);
  const collectionAssetsCount = useAppSelector(selectCollectionAssetsCount);

  const entityExternalId = useValueFromRouter<string>("entityId");
  const batchId = useValueFromRouter<IBatch["id"]>("batchId");

  useEffect(() => {
    if (!entityExternalId || !batchId) return;
    dispatch(fetchEntityByExternalIdAndFill(entityExternalId));
    dispatch(fetchAndFillCollections());
    dispatch(fetchBatchById(batchId));
  }, [dispatch, entityExternalId, batchId]);

  useEffect(() => {
    console.log(
      [batch ? "🦍" : "", entity ? "🦧" : "", collection ? "🐒" : ""].join(""),
      {
        batch,
        entity,
        collection,
      }
    );
  }, [batch, entity, collection]);

  const entityProfile = entity?._profile;
  const tokenIpfs = collection?._tokenIpfs;
  const claimOut = batch?._claimVer?.outcome;
  const claimVer = batch?._claimVer;
  const deviceCredSubject = entity?._deviceCredential?.credentialSubject;
  const supamoto = entity?._supamoto;
  const claimIssuerProfile = batch?._claimIssuer?._profile;
  const entityCreated = !entity?.metadata?.created
    ? undefined
    : new Date(entity?.metadata?.created).toLocaleDateString();
  const verifiableCred = batch?._verifiableCred;
  const evaluation = claimVer?.credentialSubject.evaluation;

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <DetailPortalContext.Provider value={{ key, setKey }}>
      <Container fluid w="100%" h="100%" p="2em">
        <Title
          order={1}
          size="40px"
          fw={300}
          color={palette.Neutral800}
          mb="1.45em"
        >
          CARBON Certificate
        </Title>

        <Grid gutter="xl">
          <Grid.Col span={4} order={2}>
            {/* The component below serves as a portal target, so it should render before main grid below */}
            <DetailCard />
          </Grid.Col>
          <Grid.Col span={8} order={1}>
            <HeaderCard
              name={batch?.name}
              index={batch?.index}
              progress={entity?._token?.CARBON._totalMinted}
            />

            <Grid py="md" px="lg" gutter="lg">
              <Grid.Col span={6}>
                <ImpactAsset
                  entityExternalId={entityExternalId}
                  entityIdentifier={`${entityProfile?.brand} ${entity?.alsoKnownAs}`}
                  collectionName={tokenIpfs?.name}
                  collectionImage={tokenIpfs?.image}
                  collectionLogo={tokenIpfs?.properties.icon}
                  assetImage={entityProfile?.imageUrl}
                  assetLogo={entityProfile?.logoUrl}
                  collectionDenom={tokenIpfs?.properties.denom}
                  entityCreated={entityCreated}
                  entityTotalMinted={entity?._token?.CARBON._totalMinted}
                  entityOwner={entity?.owner}
                  entityName={entityProfile?.name}
                  entityDescription={entityProfile?.description}
                  entityStartDate={entity?.startDate}
                  collectionProfileDescription={
                    collection?._profile?.description
                  }
                  collectionProfileName={collection?._profile?.name}
                  collectionAssetsAmount={collectionAssetsCount}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <ImpactClaim
                  fuelType={claimOut?.calculation.type}
                  fuelAmount={`${claimOut?.calculation.quantity.amount} ${claimOut?.calculation.quantity.units}`}
                  conversionFactor={claimOut?.calculation.factor.toLocaleString()}
                  period={claimOut?.period}
                  emissionsAvoided={`${claimOut?.calculation.result.amount} ${claimOut?.calculation.result.units}`}
                  claimIssuer={claimIssuerProfile}
                  claimCer={batch?._claimCer}
                  verifiableCred={verifiableCred}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <CleanEnergyDevice
                  type={deviceCredSubject?.product.description}
                  modelCertificationUrl={deviceCredSubject?.certification.id}
                  modelAttribute={entity?._profile?.attributes.find(
                    byKey("Model")
                  )}
                  fuelAttribute={entityProfile?.attributes.find(byKey("Fuel"))}
                  manufactureDate={deviceCredSubject?.manufacturer.date}
                  manufacturePlace={deviceCredSubject?.manufacturer.country}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Project
                  name={entityProfile?.name}
                  developer={entityProfile?.brand}
                  country={entityProfile?.location}
                  impactProducer=""
                  emissionsAvoided=""
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <ImpactProducer
                  identifier={entity?.externalId?.toString()}
                  countryAttribute={entityProfile?.attributes.find(
                    byKey("Location")
                  )}
                  settingAttribute={entityProfile?.attributes.find(
                    byKey("Usage")
                  )}
                  household=""
                  cookingSummary={entity?._supamotoCookingSummary?.content}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Evaluator
                  oracle={claimVer?.issuer.id}
                  methodologyName={evaluation?.methodology.type.split(":")[1]}
                  methodologyLink={evaluation?.methodology.id}
                  model={evaluation?.model}
                  version={evaluation?.version}
                  claimsProcessed=""
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
      </Container>
    </DetailPortalContext.Provider>
  );
}
