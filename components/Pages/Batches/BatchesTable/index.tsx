import { useEffect, useState } from "react";

import {
  IAddressBatchesEntry,
  IAddressBatchWithId,
} from "@/types/certificates";
import BaseTable from "@/components/Presentational/BaseTable/BaseTable";
import { IColumnHeader } from "@/types/entityCollections";
import sortBatchesByAmount from "@/helpers/batches/sortByAmount";
import extendBatches from "@/helpers/transformData/extendBatches";

type Props = {
  batches?: IAddressBatchesEntry[];
};

const defaultColumnHeadersState: IColumnHeader[] = [
  {
    name: "Date",
    isActive: false,
    isSortable: true,
    cellField: "",
  },
  {
    name: "Asset",
    isActive: false,
    isSortable: true,
    cellField: "",
  },
  {
    name: "Measurement",
    isActive: false,
    cellField: "",
  },
  {
    name: "Verifier",
    isActive: false,
    cellField: "",
  },
  {
    name: "CARBON verified",
    isActive: false,
    isSortable: true,
    cellField: "amount",
  },
  {
    name: "CARBON retired",
    isActive: false,
    isSortable: true,
    cellField: "retired",
  },
];

export default function BatchesTable({ batches }: Props) {
  const [columnHeaders, setActiveColumnHeaders] = useState<IColumnHeader[]>(
    defaultColumnHeadersState
  );
  const [selectedColumnHeaderIndex, setSelectedColumnHeaderIndex] = useState<
    number | undefined
  >();
  const [selectedBatchId, setSelectedBatchId] = useState<string | undefined>();
  const [sortedBatches, setSortedBatches] = useState<IAddressBatchesEntry[]>(
    []
  );

  const sortBatches = (clickedColumnIndex: number) => {
    setActiveColumnHeaders((columns) =>
      columns.map((column, columnIndex) =>
        clickedColumnIndex === columnIndex
          ? { ...column, isActive: !column.isActive }
          : { ...column, isActive: false }
      )
    );
    setSelectedColumnHeaderIndex(clickedColumnIndex);
  };

  useEffect(() => {
    if (selectedColumnHeaderIndex !== undefined && sortedBatches.length)
      switch (columnHeaders[selectedColumnHeaderIndex].name) {
        case "CARBON verified":
          if (columnHeaders[selectedColumnHeaderIndex].isActive) {
            setSortedBatches((prevBatches) =>
              sortBatchesByAmount(prevBatches, false)
            );
            return;
          }
          if (batches?.length) {
            setSortedBatches(batches);
          }
          break;

        default:
          break;
      }
  }, [columnHeaders]);

  useEffect(() => {
    if (batches?.length && batches !== sortedBatches) {
      setSortedBatches(batches);
    }
  }, [batches]);

  return (
    <BaseTable<IAddressBatchWithId>
      rows={extendBatches(sortedBatches)}
      selectedRowId={selectedBatchId}
      onRowSelect={(batch) => setSelectedBatchId(batch.id)}
      onSort={sortBatches}
      columnHeaders={columnHeaders}
    />
  );
}