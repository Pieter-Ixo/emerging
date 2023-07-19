import { Image } from "@mantine/core";

export default function MapImage({
  latitude,
  longitude,
}: {
  latitude?: string | number;
  longitude?: string | number;
}) {
  if (!latitude && !longitude) return null;

  const geoObj = JSON.stringify({
    type: "Point",
    coordinates: [longitude, latitude],
  });
  const geoJSON = encodeURIComponent(geoObj);

  const url = `https://api.mapbox.com/styles/v1/mapbox/light-v10/static/geojson(${geoJSON})/${longitude},${latitude},3/600x400?access_token=pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg`;

  return (
    <Image
      radius="md"
      src={url}
      alt="map which shows where the cookstove is located"
    />
  );
}
