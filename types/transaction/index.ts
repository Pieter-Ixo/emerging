export interface IToken {
  id: string;
  amount: string;
}
export interface ITransaction {
  owner: string;
  tokens: IToken[];
  jurisdiction: string;
  reason: string;
}
