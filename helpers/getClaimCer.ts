import request from "@/requests/request";
import { IClaimCer } from "@/types/certificates/claimCer";
import { IClaimVer } from "@/types/certificates/claimVer";

const CLAIM_CER_MOCK: IClaimCer = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    {
      ixo: "https://w3id.org/ixo/context/v1",
      claim: "https://w3id.org/emerging/vocab/v1",
      protocol: "did:ixo:entity:8fcbc757e75c120dd4beae0e5696fd38#",
      web3: "https://ipfs.io/ipfs/",
      cellnode: "https://devnet-cellnode.ixo.earth",
      type: "@type",
      "@protected": true,
      "@version": 1.1,
    },
  ],
  id: "urn:uuid:a0d210fd-1d1f-4cd8-94bb-32452428f422",
  type: ["VerifiableCredential", "ixo:claim", "claim:CER"],
  credentialSubject: {
    id: "did:ixo:entity:fe10ed6f17aa11f35068b126be43a1fc",
    type: ["ixo:entity", "claim:CleanCooking"],
    claim: {
      id: "protocol:CER",
      type: "claim:CarbonEmissionReduction",
      impact: {
        id: "protocol:VER",
        type: "claim:VerifiedEmissionReduction",
      },
      project: {
        id: "web3:bafybeihxer3dxr4zaagzntb7w7rrg3ck33rox6x42ersgb4p4z5ccnxkti",
        type: "claim:GasifyingBiomass",
        credential: {
          id: "did:ixo:entity:eb98bb2c92a62557b6c88c6f80e8d258#projectCredential",
          type: ["VerifiableCredential", "claim:ProjectCredential"],
          issuer: "did:ixo:entity:a1fcead81eab2f1158a726597d872413",
          proof: "bafybeihxer3dxr4zaagzntb7w7rrg3ck33rox6x42ersgb4p4z5ccnxkti",
        },
      },
      location: {
        country: "ZM",
        region: "Africa",
        setting: "Domestic",
      },
      period: {
        startDate: "2022-08-18T12:23:00.000Z",
        endDate: "2022-09-03T10:34:00.000Z",
      },
      measure: {
        id: "web3:bafkreihnles23ry5plqpcgirjmhldftg5gjc2pziilkqwszid6ziaxuqyq",
        type: ["claim:CookingFuel", "claim:BiomassPellets"],
        quantity: {
          amount: 30,
          units: "kg",
        },
      },
      evidence: [
        {
          linkedClaim: {
            id: "cellnode:/bafkreie577cpd2ujdp5h2i4ulsxgjcdquedyztu3nkiewpuk6udxhbnzse",
            type: ["VerifiableCredential", "claim:FuelPurchase"],
            digestMultibase:
              "bafkreie577cpd2ujdp5h2i4ulsxgjcdquedyztu3nkiewpuk6udxhbnzse",
          },
        },
      ],
    },
  },
  issuer: {
    id: "did:ixo:entity:a1fcead81eab2f1158a726597d872413",
  },
  issuanceDate: "2023-06-26T06:49:43.831Z",
  proof: {
    type: "Ed25519Signature2018",
    created: "2023-06-26T06:49:43Z",
    verificationMethod:
      "did:ixo:entity:a1fcead81eab2f1158a726597d872413#DQPAV2hR3RQzRATr2r6EHa3LW8zk1E6fw5gpNUZJkAzx",
    proofPurpose: "assertionMethod",
    jws: "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..QCQeXtUDX9E3Cbevhy0YfzbRpzotNRMHszgh1mYAqImp2mh-hRPR1Db_ZUgdpJWZWSa_mQemax4fmynTgaORBg",
  },
};

export default async function getClaimCer(
  claimVer: IClaimVer
): Promise<IClaimCer | undefined> {
  const claimCerId = claimVer?.outcome.linkedClaim.id.split(":")?.[1];
  const cellnodeURL = claimVer["@context"][1]?.cellnode;

  try {
    const claimCer = await request<IClaimCer>(`${cellnodeURL}${claimCerId}`);
    return claimCer;
  } catch (error) {
    return CLAIM_CER_MOCK;
  }
}
