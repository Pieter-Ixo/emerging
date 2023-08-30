import { useState } from "react";
import Link from "next/link";

import BaseIcon from "@/components/Presentational/BaseIcon";
import BaseTable from "@/components/Presentational/BaseTable/BaseTable";
import { IColumnHeader } from "@/types/entityCollections";
import { ITransactionData } from "@/types/entityCollections/transactions";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";
import { Flex, Text } from "@mantine/core";
import { palette } from "@/theme/palette";

import shortStr from "../../../../utils/shortStr";

type Props = {
  transactions: ITransactionData[];
};

export default function TransactionTable({ transactions }: Props) {
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

  const [columnHeaders, setActiveColumnHeaders] = useState<IColumnHeader[]>(
    defaultColumnHeadersState
  );

  function convertTransactions(transactionsData: ITransactionData[]) {
    return transactionsData.map((transaction) => ({
      ...transaction,
      transactionType: (
        <Flex align="center" gap={4}>
          <BaseIcon
            variant="circle"
            circleSize="sm"
            status="selected"
            Icon={ArrowLeftIcon}
          />
          <Text>Test</Text>
        </Flex>
      ),
      transactionLink: (
        <Link href="google.com" target="_blank">
          <Text color={palette.fullBlue}>
            {shortStr("123412341234", 11, 4)}
          </Text>
        </Link>
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
