import { useEffect } from "react";

import getEntityTotalTokenAmount, {
  getEntityTotalMintedAmount,
} from "@/helpers/transformData/getTotalMintedAmount";
import { useCookstove } from "@/context/cookstove";
import { IEntityExtended } from "@/types/entityCollections";

import CookstoveDashboard from "../CookstoveDashboard/inidex";

interface Props {
  id: number | string;
  entity: IEntityExtended;
}

export default function CookstoveModal({ id, entity }: Props) {
  const { stove, fetchStove } = useCookstove();
  const totalTokenAmount = getEntityTotalTokenAmount(entity);
  const totalMinted = getEntityTotalMintedAmount(entity);

  useEffect(() => {
    if (!!id && stove.id !== id) {
      fetchStove(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stove.id]);

  return <CookstoveDashboard entityExternalId={id} stove={stove} />;
}
