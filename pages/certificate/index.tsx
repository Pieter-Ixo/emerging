import { Flex } from "@mantine/core";
import { CertificateDashboard } from "@/components/Dashboard";
import Navbar from "@/components/Navbar/navbar";
import { initStyles } from "@/theme/initStyles";

export default function Certificate() {
  return (
    <Flex>
      <Navbar />
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
