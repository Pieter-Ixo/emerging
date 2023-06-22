import { Flex } from "@mantine/core";

import DataPartTitle from "./CertificateDataTitle";
import CertificateDataRow from "./CertificateDataRow";

export default function ImpactAssetCertificateData() {
  return (
    <Flex direction="column" gap={8}>
      <DataPartTitle iconsrc="/images/icon-assets.svg">
        IMPACT ASSET
      </DataPartTitle>

      <CertificateDataRow //
        rowName="identifier"
      >
        SupaMoto #15
      </CertificateDataRow>

      <CertificateDataRow //
        rowName="collection"
      >
        SupaMoto Genesis
      </CertificateDataRow>

      <CertificateDataRow //
        rowName="denom"
      >
        SUPA
      </CertificateDataRow>

      <CertificateDataRow //
        rowName="creation date"
      >
        5 Apr 2023
      </CertificateDataRow>

      <CertificateDataRow //
        rowName="total CARBON produced"
      >
        1,235 CARBON
      </CertificateDataRow>

      <CertificateDataRow //
        rowName="total emissions avoided"
      >
        1,235 kgCO₂
      </CertificateDataRow>

      <CertificateDataRow //
        rowName="owned by"
      >
        ixo12345...12345
      </CertificateDataRow>

      <CertificateDataRow //
        rowName="performance"
      >
        dashboard
      </CertificateDataRow>
    </Flex>
  );
}
