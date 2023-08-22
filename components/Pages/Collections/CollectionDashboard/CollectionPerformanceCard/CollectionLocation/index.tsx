import { Box, Center, Loader } from "@mantine/core";

import { useAppSelector } from "@/hooks/redux";
import { selectCollectionById } from "@/redux/entityCollections/selectors";
import useValueFromRouter from "@/utils/useValueFromRouter";
import MapImage from "@/components/Presentational/MapImage";

export default function CollectionLocation() {
  const collectionId = useValueFromRouter("collectionId");
  const collection = useAppSelector((state) =>
    selectCollectionById(state, collectionId)
  );

  if (!collection?._profile?.location)
    return (
      <Center py="xl">
        <Loader />
      </Center>
    );

  return (
    <Box mt={28}>
      <MapImage latitude={-12.98906} longitude={28.64762} />
    </Box>
  );
}
