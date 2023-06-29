import { Flex, Loader } from "@mantine/core";

import { useAppSelector } from "@/hooks/redux";
import { selectSelectedEntity } from "@/redux/entityCollections/selectors";

import DataPartTitle from "./CertificateDataTitle";
import CertificateDataRow from "./CertificateDataRow";

export default function ImpactAssetCertificateData() {
  const entity = useAppSelector(selectSelectedEntity);

  if (!entity) return <Loader />;

  return (
    <Flex direction="column" gap={8}>
      <DataPartTitle iconsrc="/images/icon-assets.svg">
        IMPACT ASSET
      </DataPartTitle>

      <CertificateDataRow //
        rowName="identifier"
      >
        {`${entity._profile?.brand} ${entity.alsoKnownAs?.split("}")[1]}`}
      </CertificateDataRow>

      <CertificateDataRow //
        rowName="collection"
      >
        TOKEN_IPFS.name
      </CertificateDataRow>

      <CertificateDataRow //
        rowName="denom"
      >
        TOKEN_IPFS.”properties”.”denom”
      </CertificateDataRow>

      <CertificateDataRow //
        rowName="creation date"
      >
        {new Date(entity.startDate).toLocaleDateString()}
      </CertificateDataRow>

      <CertificateDataRow //
        rowName="total CARBON produced"
      >
        CARBON.”totalProduced”
      </CertificateDataRow>

      <CertificateDataRow //
        rowName="total emissions avoided"
      >
        Calculation kgCO₂
      </CertificateDataRow>

      <CertificateDataRow //
        rowName="owned by"
      >
        ENTITY.”owner”
      </CertificateDataRow>

      <CertificateDataRow //
        rowName="performance"
      >
        DASHBOARD_LINK
      </CertificateDataRow>
    </Flex>
  );
}
