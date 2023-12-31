import { Table } from "@mantine/core";

import { IColumnHeader } from "@/types/entityCollections";

import TableHeadCell from "./TableHeadCell/TableHeadCell";
import TableRow from "./TableRow/TableRow";

type RowWithId = {
  id: string | number;
};

type Props<T extends RowWithId> = {
  rows?: T[];
  columnHeaders: IColumnHeader[];
  selectedRowId?: string | number;
  centerHeaders?: boolean;
  centerCells?: boolean;
  onRowSelect?: (row: T) => void;
  onSort?: (columnFieldName: string) => void;
};

/**
 * @param {Props<T>} props - The component props.
 * @param {IColumnHeader[]} props.columnHeaders - cellField example: "myField.myField"
 * @param {T} props.selectedRow - Has to contain id, similar to
 * rows param objects
 */
export default function BaseTable<T extends RowWithId>({
  rows,
  selectedRowId,
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
            columnHeaders.map((columnHeader) => (
              <TableHeadCell
                key={columnHeader.name}
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
              isSelected={selectedRowId === rowData?.id}
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
