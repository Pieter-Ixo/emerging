import { Text } from "@mantine/core";
import { useAppSelector } from "@/hooks/redux";

export default function CollectionsGrid() {
  const state = useAppSelector((state) => state);
  console.log("🍣", state);

  return <Text>Hello</Text>;
}
