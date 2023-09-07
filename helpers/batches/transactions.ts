import { IRetireTokenTrxGenerationData } from "@/types/certificates";
import { TRX_TYPES } from "@/types/transactions";
import { ixo } from "@ixo/impactxclient-sdk";

const generateRetireTokenTrx = ({
  owner,
  reason = "offset",
  jurisdiction = "Global",
  tokens,
}: IRetireTokenTrxGenerationData) => ({
  typeUrl: TRX_TYPES.MsgRetireToken,
  value: ixo.token.v1beta1.MsgRetireToken.fromPartial({
    owner,
    reason,
    jurisdiction,
    tokens: tokens.map((batch) =>
      ixo.token.v1beta1.TokenBatch.fromPartial({
        id: batch.id,
        amount: (batch?.amount ?? 0).toString(),
      })
    ),
  }),
});

export default generateRetireTokenTrx;
