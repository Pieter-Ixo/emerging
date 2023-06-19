import CollectionsLayout from "../components/Layout";
import CollectionsGrid from "./components/CollectionsGrid";
import Header from "./components/Header";

export default function Collections() {
  return (
    <CollectionsLayout>
      <Header />
      <CollectionsGrid />
    </CollectionsLayout>
  );
}
