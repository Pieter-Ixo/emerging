import { CredentialSubject } from "@/types/entityCollections/deviceCredentials";
import { IProfileSettings } from "@/types/entityCollections/settings";

export type AssetAttributesProps = {
  entityProfile?: IProfileSettings;
  deviceCredSubject?: CredentialSubject;
};

export default function PagePlug() {
  return null;
}
