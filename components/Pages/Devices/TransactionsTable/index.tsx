import { useMemo, useState } from "react";

import BaseTable from "@/components/Presentational/BaseTable/BaseTable";
import { IColumnHeader } from "@/types/entityCollections";
import { ITransactionData } from "@/types/entityCollections/transactions";

import TransactionType from "../TransactionType";
import TransactionLink from "../TransactionLink";

type Props = {
  transactions: ITransactionData[];
};

const defaultColumnHeadersState: IColumnHeader[] = [
  {
    name: "Type",
    isActive: false,
    isSortable: true,
    cellField: "transactionType",
  },
  {
    name: "Date",
    isActive: false,
    isSortable: true,
    cellField: "",
  },
  {
    name: "Detail",
    isActive: false,
    cellField: "",
  },
  {
    name: "Link",
    isActive: false,
    cellField: "transactionLink",
  },
];

export default function TransactionTable({ transactions }: Props) {
  const [columnHeaders, setActiveColumnHeaders] = useState<IColumnHeader[]>(
    defaultColumnHeadersState
  );

  const convertTransactions = (transactionsData: ITransactionData[]) =>
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
    <BaseTable
      columnHeaders={columnHeaders}
      centerHeaders
      centerCells
      rows={convertedTransactions}
    />
  );
}
