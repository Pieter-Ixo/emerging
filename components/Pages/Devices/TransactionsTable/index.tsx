import { useMemo, useState } from "react";

import { IColumnHeader } from "@/types/entityCollections";
import {
  IExtendedTransaction,
  ITransactionData,
} from "@/types/entityCollections/transactions";
import BaseTable from "@/components/Presentational/BaseTable";

import TransactionType from "../TransactionType";
import TransactionLink from "../TransactionLink";

type Props = {
  transactions: ITransactionData[];
};

const defaultColumnHeadersState: IColumnHeader[] = [
  {
    name: "Type",
    isSortable: true,
    sortOrder: "default",
    cellField: "transactionType",
  },
  {
    name: "Date",
    isSortable: true,
    sortOrder: "default",
    cellField: "",
  },
  {
    name: "Detail",
    cellField: "",
  },
  {
    name: "Link",
    cellField: "transactionLink",
  },
];

export default function TransactionTable({ transactions }: Props) {
  const [columnHeaders, setActiveColumnHeaders] = useState<IColumnHeader[]>(
    defaultColumnHeadersState
  );

  const convertTransactions = (
    transactionsData: ITransactionData[]
  ): IExtendedTransaction[] =>
    transactionsData.map((transaction) => ({
      ...transaction,
      transactionType: <TransactionType />,
      transactionLink: <TransactionLink />,
    }));

  const convertedTransactions = useMemo(
    () => convertTransactions(transactions),
    [transactions]
  );

  return (
    <BaseTable<IExtendedTransaction>
      columnHeaders={columnHeaders}
      centerHeaders
      centerCells
      rows={convertedTransactions}
    />
  );
}
