import useValueFromRouter from "@/utils/useValueFromRouter";
import { initStyles } from "@/theme/initStyles";
import AppLayout from "@/components/Layout/AppLayout";

export default function BatchesPage() {
  const entityId = useValueFromRouter("entityId");
  const batchId = useValueFromRouter("batchId");

  return (
    <AppLayout title="Batch Dashboard">
      <main
        style={{
          marginLeft: initStyles.navWidth,
          width: "100%",
          background: "#FAFAFA",
        }}
      >
        <p>{entityId}</p>
        <p>{batchId}</p>
      </main>
    </AppLayout>
  );
}
