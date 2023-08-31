import { Table } from "@mantine/core";

import { IColumnHeader } from "@/types/entityCollections";

import TableRow from "./TableRow/TableRow";
import TableHeadCell from "./TableHeadCell/TableHeadCell";

type RowWithId = {
  id: string | number;
};

type Props<T extends RowWithId> = {
  rows?: T[];
  columnHeaders: IColumnHeader[];
  selectedRow?: T;
  centerHeaders?: boolean;
  centerCells?: boolean;
  onRowSelect?: (row: T) => void;
  onSort?: (headerIndex: number) => void;
};

/**
 * @param {Props<T>} props - The component props.
 * @param {IColumnHeader[]} props.columnHeaders - cellField example: "myField.myField"
 * @param {T} props.selectedRow - Has to contain id, similar to
 * rows param objects
 */
export default function BaseTable<T extends RowWithId>({
  rows,
  selectedRow,
  columnHeaders,
  onRowSelect,
  onSort,
  centerHeaders = false,
  centerCells = false,
}: Props<T>) {
  return (
    <Table
      highlightOnHover
      style={{
        alignSelf: "stretch",
      }}
    >
      <thead>
        <tr>
          {columnHeaders?.length &&
            columnHeaders.map((columnHeader, headerIndex) => (
              <TableHeadCell
                key={columnHeader.name}
                headerIndex={headerIndex}
                columnHeader={columnHeader}
                onSort={onSort}
                centerHeaders={centerHeaders}
              />
            ))}
        </tr>
      </thead>
      <tbody>
        {rows?.length ? (
          rows.map((rowData) => (
            <TableRow
              centerCells={centerCells}
              key={rowData.id}
              isSelected={selectedRow?.id === rowData?.id}
              onRowSelect={onRowSelect}
              rowData={rowData}
              columnHeaders={columnHeaders}
            />
          ))
        ) : (
          <tr style={{ textAlign: "center" }}>
            <td style={{ paddingTop: 20 }} colSpan={columnHeaders.length} />
          </tr>
        )}
      </tbody>
    </Table>
  );
}
