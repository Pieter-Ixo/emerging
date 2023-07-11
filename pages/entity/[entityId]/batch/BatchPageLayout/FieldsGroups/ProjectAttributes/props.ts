import { CredentialSubject } from "@/types/entityCollections/deviceCredentials";
import { IProfileSettings } from "@/types/entityCollections/settings";

export type ProjectAttributesProps = {
  entityProfile?: IProfileSettings;
  deviceCredSubject?: CredentialSubject;
};

export default function PagePlug() {
  return null;
}
