import { Flex } from "@mantine/core";
import { CertificateDashboard } from "@/components/Dashboard";
import { Nav } from "@/components/Navbar/navbar";

export default function Certificate() {
  return (
    <Flex>
      <Nav />
      <main style={{ width: "100%", background: "#FAFAFA" }}>
        <CertificateDashboard />
      </main>
    </Flex>
  );
}
