import { useAppDispatch } from "@/hooks/redux";
import { useEffect } from "react";
import { CollectionDashboard } from "@/components/Dashboard";
import { fetchAllEntities } from "@/redux/collection/thunks";
import Nav from "@/components/Navbar/navbar";
import { Flex } from "@mantine/core";
import { initStyles } from "@/theme/initStyles";

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllEntities());
  }, [dispatch]);

  return (
    <Flex>
      <Nav />
      <main style={{ marginLeft:initStyles.navWidth, width: "100%", background: "#FAFAFA" }}>
        <CollectionDashboard />
      </main>
    </Flex>
  );
}
