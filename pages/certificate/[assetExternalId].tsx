import { Flex } from "@mantine/core";
import { initStyles } from '@/theme/initStyles';
import Nav from "@/components/Navbar/navbar";

import CertificateDashboard from "./CertificateDashboard";

export default function Certificate() {
  return (
    <Flex>
      <Nav />
      <main
        style={{
          marginLeft: initStyles.navWidth,
          width: "100%",
          background: "#FAFAFA",
        }}
      >
        <CertificateDashboard />
      </main>
    </Flex>
  );
}
