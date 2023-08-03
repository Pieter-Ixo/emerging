import { useEffect } from "react";
import { Text } from "@mantine/core";

import { useCookstove } from "@/context/cookstove";
import useValueFromRouter from "@/utils/useValueFromRouter";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchEntityByExternalIdAndFill } from "@/redux/entityCollections/thunks";
import { selectSelectedEntity } from "@/redux/entityCollections/selectors";
import CookstoveDashboard from "@/components/CookstoveDashboard";
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

  if (!entityExternalId) return <Text>missing Entity External Id</Text>;

  const isOverZero = (num?: number) => (num || 0) > 0;

  return (
    <CookstoveDashboard
      entityExternalId={entityExternalId}
      stove={stove}
      totalTokenAmount={isOverZero(totalTokenAmount) ? totalTokenAmount : 0}
      totalMinted={isOverZero(totalMinted) ? totalMinted : 0}
      totalOffset={isOverZero(totalOffset) ? totalOffset : 0}
      totalTransferred={isOverZero(totalTransferred) ? totalTransferred : 0}
    />
  );
}
