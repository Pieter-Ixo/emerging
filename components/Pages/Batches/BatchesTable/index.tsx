import { useEffect, useState } from "react";

import { IAddressBatchWithId } from "@/types/certificates";
import { IColumnHeader } from "@/types/entityCollections";
import sortObjectsBy from "@/helpers/sorters/sortObjectsBy";
import BaseTable from "@/components/Presentational/BaseTable";
import { Text } from "@mantine/core";

type Props = {
  batches?: IAddressBatchWithId[];
};

const defaultColumnHeadersState: IColumnHeader[] = [
  {
    name: "Date",
    cellField: "",
  },
  {
    name: "Asset",
    cellField: "",
  },
  {
    name: "Measurement",
    cellField: "",
  },
  {
    name: "Verifier",
    cellField: "",
  },
  {
    name: "CARBON verified",
    isSortable: true,
    sortOrder: "default",
    cellField: "amount",
  },
  {
    name: "CARBON retired",
    isSortable: true,
    sortOrder: "default",
    cellField: "retired",
  },
];

export default function BatchesTable({ batches }: Props) {
  const [columnHeaders, setActiveColumnHeaders] = useState<IColumnHeader[]>(
    defaultColumnHeadersState
  );
  const [selectedBatchId, setSelectedBatchId] = useState<string | undefined>();
  const [sortedBatches, setSortedBatches] = useState<IAddressBatchWithId[]>([]);

  const sortBatches = (clickedColumnFieldName: string) => {
    const activeColumnHeader = columnHeaders.find(
      (header) => header.cellField === clickedColumnFieldName
    );
    if (activeColumnHeader?.sortOrder === "default") {
      setSortedBatches((prevBatches) => {
        const ascendingEntities = sortObjectsBy(
          prevBatches,
          clickedColumnFieldName
        );
        setActiveColumnHeaders((columns) =>
          columns.map((column) =>
            clickedColumnFieldName === column.cellField
              ? { ...column, sortOrder: "ascending" }
              : { ...column, sortOrder: "default" }
          )
        );
        return ascendingEntities;
      });
    }
    if (activeColumnHeader?.sortOrder === "ascending") {
      setSortedBatches((prevBatches) => {
        const descendingEntities = sortObjectsBy(
          prevBatches,
          clickedColumnFieldName,
          false
        );
        setActiveColumnHeaders((columns) =>
          columns.map((column) =>
            clickedColumnFieldName === column.cellField
              ? { ...column, sortOrder: "descending" }
              : { ...column, sortOrder: "default" }
          )
        );
        return descendingEntities;
      });
    }
    if (activeColumnHeader?.sortOrder === "descending") {
      setSortedBatches(() => {
        setActiveColumnHeaders((columns) =>
          columns.map((column) => ({ ...column, sortOrder: "default" }))
        );
        return batches!;
      });
    }
  };

  useEffect(() => {
    if (batches?.length) {
      setSortedBatches(batches);
    }
  }, [batches]);
  if (batches?.length === 0) return <Text>No Batches</Text>;

  return (
    <BaseTable<IAddressBatchWithId>
      rows={sortedBatches}
      selectedRowId={selectedBatchId}
      onRowSelect={(batch) => setSelectedBatchId(batch.id)}
      onSort={sortBatches}
      columnHeaders={columnHeaders}
    />
  );
}
