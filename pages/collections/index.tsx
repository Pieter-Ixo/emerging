import { useAppDispatch } from "@/hooks/redux";
import { fetchAllEntities } from "@/redux/collectionSlice";
import { CollectionDashboard } from "@/components/Dashboard";
import { useEffect } from "react";
import { Nav } from "@/components/Navbar/navbar";
import { Flex } from "@mantine/core";

export default function Collections() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllEntities());
  }, [dispatch]);

  return (
    <Flex>
      <Nav />
      <main style={{ width: "100%", background: "#FAFAFA" }}>
        <CollectionDashboard />
      </main>
    </Flex>
  );
}
