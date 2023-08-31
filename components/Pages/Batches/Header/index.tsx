import { Container, Flex, Title } from "@mantine/core";

import GlobalPortfolioSwitch from "@/components/Layout/GlobalPortfolioSwitch";
import { ViewMods } from "@/types/stove";
import Controls from "@/components/Containers/Controls";

type Props = {
  toggleBatchesViewMode: () => void;
  activeViewMode?: ViewMods;
};

export default function BatchesPageHeader({
  toggleBatchesViewMode,
  activeViewMode = ViewMods.gridView,
}: Props) {
  return (
    <Container fluid mb="xl" px="0" sx={{ width: "100%" }}>
      <Flex align="center" gap={24}>
        <GlobalPortfolioSwitch selectedLink="portfolio" />
        <Title order={2} fw={300}>
          Carbon Certificates
        </Title>
        <Controls
          isSearchVisible={false}
          activeViewMode={activeViewMode}
          toggleViewMode={toggleBatchesViewMode}
        />
      </Flex>
    </Container>
  );
}
