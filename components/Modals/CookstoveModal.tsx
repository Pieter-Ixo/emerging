import { useEffect } from "react";

import getEntityTotalTokenAmount, {
  getEntityTotalMintedAmount,
} from "@/helpers/transformData/getTotalMintedAmount";
import { useCookstove } from "@/context/cookstove";
import { IEntityExtended } from "@/types/entityCollections";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchEntityByExternalIdAndFill } from "@/redux/entityCollections/thunks";
import { selectSelectedEntity } from "@/redux/entityCollections/selectors";
import CookstoveDashboard from "../CookstoveDashboard";

interface Props {
  entityId: string;
  entity: IEntityExtended;
}

export default function CookstoveModal({ entityId, entity }: Props) {
  const { stove, fetchStove } = useCookstove();
  const selectedEntity = useAppSelector(selectSelectedEntity);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!!entityId && stove.id !== entityId) {
      fetchStove(entityId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stove.id]);

  useEffect(() => {
    dispatch(fetchEntityByExternalIdAndFill(entityId));
  }, [entityId]);

  return (
    <CookstoveDashboard
      totalMinted={getEntityTotalMintedAmount(selectedEntity)}
      totalTokenAmount={getEntityTotalTokenAmount(selectedEntity)}
      entityExternalId={entityId}
      stove={stove}
    />
  );
}
