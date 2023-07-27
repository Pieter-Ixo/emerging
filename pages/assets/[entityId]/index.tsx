import { useEffect } from "react";
import { Text } from "@mantine/core";

import { useCookstove } from "@/context/cookstove";
import useValueFromRouter from "@/utils/useValueFromRouter";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchEntityByExternalIdAndFill } from "@/redux/entityCollections/thunks";
import { selectSelectedEntity } from "@/redux/entityCollections/selectors";
import CookstoveDashboard from "@/components/CookstoveDashboard/inidex";
import getEntityTotalTokenAmount, {
  getEntityTotalMintedAmount,
  getEntityTotalRetiredAmount,
} from "@/helpers/transformData/getTotalMintedAmount";

export default function DevicePageLayout() {
  const dispatch = useAppDispatch();
  const entity = useAppSelector(selectSelectedEntity);

  const entityExternalId = useValueFromRouter<string>("entityId");
  const { stove, fetchStove } = useCookstove();

  useEffect(() => {
    if (!entityExternalId) return;
    fetchStove(entityExternalId);
    dispatch(fetchEntityByExternalIdAndFill(entityExternalId));
  }, [dispatch, stove.id, entityExternalId, fetchStove]);

  const totalTokenAmount = getEntityTotalTokenAmount(entity);
  const totalMinted = getEntityTotalMintedAmount(entity);
  const totalOffset = getEntityTotalRetiredAmount(entity);

  const totalTransferred = (totalMinted || 0) - (totalTokenAmount || 0);

  console.log("🦧", entity);

  if (!entityExternalId) return <Text>missing Entity External Id</Text>;

  return (
    <CookstoveDashboard
      entityExternalId={entityExternalId}
      stove={stove}
      totalTokenAmount={totalTokenAmount}
      totalMinted={totalMinted}
      totalOffset={totalOffset}
      totalTransferred={totalTransferred > 0 ? totalTransferred : 0}
    />
  );
}
