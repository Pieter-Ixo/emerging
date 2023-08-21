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
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124413.19081668447!2d28.631971899999996!3d-12.97746645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x196cb4e3a782fdc7%3A0x540fdfe500034f23!2z0J3QtNC-0LvQsCwg0JfQsNC80LHQuNGP!5e0!3m2!1sru!2spl!4v1692637240792!5m2!1sru!2spl"
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
