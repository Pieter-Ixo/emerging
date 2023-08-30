import BaseIcon from "@/components/Presentational/BaseIcon";
import BaseTable from "@/components/Presentational/BaseTable/BaseTable";
import { IColumnHeader } from "@/types/entityCollections";
import { ITransactionData } from "@/types/entityCollections/transactions";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";
import { Text } from "@mantine/core";

type Props = {
  transactions: ITransactionData[];
};

export default function TransactionTable({ transactions }: Props) {
  const columnHeaders: IColumnHeader[] = [
    {
      name: "Type",
      isActive: false,
      isSortable: true,
      cellField: "transactionType",
    },
    {
      name: "Date",
      isActive: false,
      cellField: "typeUrl",
    },
    {
      name: "Detail",
      isActive: false,
      cellField: "typeUrl",
    },
    {
      name: "Link",
      isActive: false,
      cellField: "typeUrl",
    },
  ];

  function convertTransactions(transactions: ITransactionData[]) {
    return transactions.map((transaction) => ({
      ...transaction,
      transactionType: (
        <Text>
          <BaseIcon
            variant="circle"
            circleSize="sm"
            status="selected"
            Icon={ArrowLeftIcon}
          />
        </Text>
      ),
    }));
  }

  return (
    <BaseTable
      columnHeaders={columnHeaders}
      rows={convertTransactions(transactions)}
    />
  );
}
