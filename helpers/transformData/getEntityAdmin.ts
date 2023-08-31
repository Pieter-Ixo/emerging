import { IEntityExtended } from "@/types/entityCollections";

export default function getEntityAdmin(entity: IEntityExtended) {
  return entity.accounts.find((acc) => acc.name === "admin")?.address;
}
