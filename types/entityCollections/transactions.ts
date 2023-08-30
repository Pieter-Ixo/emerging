interface ITransaction {
    hash: string;
    height: number;
    code: number;
    fee: string;
    gasUsed: string;
    gasWanted: string;
    time: string;
}

interface ITransactionData {
    id: number;
    transactionHash: string;
    typeUrl: string;
    value: string;
    from: string;
    to: string | null;
    denoms: any[]; 
    tokenNames: string[];
    Transaction: ITransaction;
}

export interface IEntityTransactionResponse {
    data: ITransactionData[];
    metaData: {
        cursor: number;
        hasNextPage: boolean;
    };
}
