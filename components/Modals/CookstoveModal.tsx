import { Suspense, useEffect } from "react";
import dynamic from "next/dynamic";
import { Center, Loader } from "@mantine/core";

import getEntityTotalTokenAmount, {
  getEntityTotalMintedAmount,
  getEntityTotalRetiredAmount,
} from "@/helpers/transformData/getTotalMintedAmount";
import { useCookstove } from "@/context/cookstove";
import { IEntityExtended } from "@/types/entityCollections";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchEntityByExternalIdAndFill } from "@/redux/entityCollections/thunks";
import { selectSelectedEntity } from "@/redux/entityCollections/selectors";
import moreOrEqualZero from "../../utils/moreOrEqualZero";

const CookstoveDashboard = dynamic(
  () => import("../Containers/CookstoveDashboard"),
  {
    loading: () => (
      <Center>
        <Loader />
      </Center>
    ),
  }
);

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

  const totalMinted = getEntityTotalMintedAmount(selectedEntity);
  const totalTokenAmount = getEntityTotalTokenAmount(selectedEntity);
  const totalOffset = getEntityTotalRetiredAmount(entity);
  const totalTransferred = (totalMinted || 0) - (totalTokenAmount || 0);

  if (!stove)
    return (
      <Center>
        <Loader />
      </Center>
    );

  return (
    <CookstoveDashboard
      totalMinted={moreOrEqualZero(totalMinted)}
      totalTokenAmount={moreOrEqualZero(totalTokenAmount)}
      totalOffset={moreOrEqualZero(totalOffset)}
      totalTransferred={moreOrEqualZero(totalTransferred)}
      entityExternalId={entityId}
      stove={stove}
    />
  );
}
