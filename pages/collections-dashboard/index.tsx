import { useAppDispatch } from "@/hooks/redux";
import { useEffect } from "react";
import { CollectionDashboard } from "@/components/Dashboard";
import { fetchAllEntities } from "@/redux/collection/thunks";
import Nav from "@/components/Navbar/navbar";
import { Flex } from "@mantine/core";

export default function Home() {
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
