import { Flex } from "@mantine/core";
import { CertificateDashboard } from "@/components/Dashboard";
import Navbar from "@/components/Navbar/navbar";

export default function Certificate() {
  return (
    <Flex>
      <Navbar />
      <main style={{ width: "100%", background: "#FAFAFA" }}>
        <CertificateDashboard />
      </main>
    </Flex>
  );
}
