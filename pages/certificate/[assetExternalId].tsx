import { Flex } from "@mantine/core";

import Nav from "@/components/Navbar/navbar";

import CertificateDashboard from "./CertificateDashboard";

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
