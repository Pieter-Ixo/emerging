import { useEffect, useState } from "react";

import { IBatch } from "@/types/certificates";
import useValueFromRouter from "@/utils/useValueFromRouter";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  fetchAndFillCollections,
  fetchEntityByExternalIdAndFill,
} from "@/redux/entityCollections/thunks";
import {
  selectCollectionAssetsCount,
  selectOnlyCollection,
  selectSelectedEntity,
} from "@/redux/entityCollections/selectors";
import { selectSelectedBatch } from "@/redux/batches/selectors";

export default function DevicePageLayout() {
  const dispatch = useAppDispatch();
  const [key, setKey] = useState<string | null>(null);
  const batch = useAppSelector(selectSelectedBatch);
  const entity = useAppSelector(selectSelectedEntity);
  const collection = useAppSelector(selectOnlyCollection);
  const collectionAssetsCount = useAppSelector(selectCollectionAssetsCount);

  const entityExternalId = useValueFromRouter<string>("entityId");
  const batchId = useValueFromRouter<IBatch["id"]>("batchId");

  useEffect(() => {
    if (!entityExternalId || !batchId) return;
    dispatch(fetchEntityByExternalIdAndFill(entityExternalId));
    dispatch(fetchAndFillCollections());
  }, [dispatch, entityExternalId, batchId]);

  useEffect(() => {
    console.log(
      [batch ? "🦍" : "", entity ? "🦧" : "", collection ? "🐒" : ""].join(""),
      {
        batch,
        entity,
        collection,
      }
    );
  }, [batch, entity, collection]);

  const entityProfile = entity?._profile;
  const tokenIpfs = collection?._tokenIpfs;
  const claimOut = batch?._claimVer?.outcome;
  const claimVer = batch?._claimVer;
  const deviceCredSubject = entity?._deviceCredential?.credentialSubject;
  const supamoto = entity?._supamoto; // request disabled
  const project = batch?._claimCer?._project;
  const protocol = batch?._protocol;
  const oracle = batch?._oracle;
  const claimIssuerProfile = batch?._claimIssuer?._profile;
  const verifiableCred = batch?._verifiableCred;
  const evaluation = claimVer?.credentialSubject.evaluation;
  const claimCer = batch?._claimCer;

  const batchProgress = entity?._token?.CARBON.tokens[batchId || ""]?.minted;

  return <p>hello there, {entityExternalId}</p>;
}
