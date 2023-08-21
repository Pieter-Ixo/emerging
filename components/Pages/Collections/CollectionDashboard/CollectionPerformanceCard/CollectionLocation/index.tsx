import { useAppSelector } from "@/hooks/redux";
import { Center, Loader } from "@mantine/core";
import { selectCollectionById } from "@/redux/entityCollections/selectors";
import useValueFromRouter from "@/utils/useValueFromRouter";

export default function CollectionLocation() {
  const collectionId = useValueFromRouter("collectionId");
  const collection = useAppSelector((state) =>
    selectCollectionById(state, collectionId)
  );

  // FIXME : EMERGING-72: provide actual collection location
  return collection?._profile?.location ? (
    <iframe
      title="Collection geolocation"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2990.274257380938!2d-70.56068388481569!3d41.45496659976631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e52963ac45bbcb%3A0xf05e8d125e82af10!2sDos%20Mas!5e0!3m2!1sen!2sus!4v1671220374408!5m2!1sen!2sus"
      style={{
        width: "100%",
        height: 287,
        marginTop: 28,
        border: 0,
        borderRadius: 10,
      }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  ) : (
    <Center py="xl">
      <Loader />
    </Center>
  );
}
