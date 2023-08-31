import { ReactNode } from "react";

interface ITransaction {
  hash: string;
  height: number;
  code: number;
  fee: string;
  gasUsed: string;
  gasWanted: string;
  time: string;
}

export interface ITransactionData {
  id: number;
  transactionHash: string;
  typeUrl: string;
  value: string;
  from: string;
  to: string | null;
  denoms: unknown[];
  tokenNames: string[];
  Transaction: ITransaction;
}
export interface IExtendedTransaction extends ITransactionData {
  transactionType: ReactNode;
  transactionLink: ReactNode;
}

export interface IEntityTransactionResponse {
  data: ITransactionData[];
  metaData: {
    cursor: number;
    hasNextPage: boolean;
  };
}
