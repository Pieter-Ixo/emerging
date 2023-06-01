import { useAppDispatch } from "@/hooks/redux";
import { fetchAllEntities } from "@/redux/collectionSlice";
import CollectionDashboard from "@/views/collectionDashboard";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllEntities());
  }, [dispatch]);

  return <CollectionDashboard />;
}
