export interface IToken {
  id: string;
  amount: string;
}
export interface ITransaction {
  "@type": string;
  owner: string;
  tokens: IToken[];
  jurisdiction: string;
  reason: string;
}
