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
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423812.3292600542!2d18.3264235053273!3d-33.914529073531575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc500f8826eed7%3A0x687fe1fc2828aa87!2sCape%20Town%2C%20South%20Africa!5e0!3m2!1sen!2sus!4v1692631487951!5m2!1sen!2sus"
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
