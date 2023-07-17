import { IEntityProfile } from "@/types/entityCollections";

export type ProjectProps = {
  projectName?: string;
  profile?: IEntityProfile;
  developer?: string;
  country?: string;
  impactProducer?: string;
  emissionsAvoided?: string;
  developerDetailHref?: string;
};

export default function PagePlug() {
  return null;
}
