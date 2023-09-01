import { useEffect, useState } from "react";

import {
  IAddressBatchesEntry,
  IAddressBatchesEntryExtended,
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
  const [columnHeaderIndex, setColumnHeaderIndex] = useState<
    number | undefined
  >();
  const [selectedBatch, setSelectedBatch] = useState<
    IAddressBatchesEntryExtended | undefined
  >();
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
    setColumnHeaderIndex(clickedColumnIndex);
  };

  useEffect(() => {
    if (columnHeaderIndex !== undefined && sortedBatches.length)
      switch (columnHeaders[columnHeaderIndex].name) {
        case "CARBON verified":
          if (columnHeaders[columnHeaderIndex].isActive) {
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
    <BaseTable<IAddressBatchesEntryExtended>
      rows={batches ? extendBatches(sortedBatches) : []}
      selectedRow={selectedBatch}
      onRowSelect={(batch) => setSelectedBatch(batch)}
      onSort={sortBatches}
      columnHeaders={columnHeaders}
    />
  );
}
