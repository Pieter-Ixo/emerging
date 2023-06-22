import { Grid } from "@mantine/core";

import ImpactAssetCertificateData from "./ImpactAssetCertificateData";

export default function CertificateData() {
  return (
    <Grid py="md" px="lg" gutter="lg">
      <Grid.Col span={6}>
        <ImpactAssetCertificateData />
      </Grid.Col>
    </Grid>
  );
}
