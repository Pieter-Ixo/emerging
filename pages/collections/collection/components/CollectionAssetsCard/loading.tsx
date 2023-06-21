import { Center, Text } from "@mantine/core";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div
      style={{
        alignSelf: "stretch",
        height: 50,
        borderRadius: 12,
        marginLeft: 220,
        marginRight: 220,

        textAlign: "center",
        marginTop: 10,
      }}
    >
      <Center>
        <Text style={{ verticalAlign: "center" }}>
          Loading your devices ...
        </Text>
      </Center>
    </div>
  );
}
