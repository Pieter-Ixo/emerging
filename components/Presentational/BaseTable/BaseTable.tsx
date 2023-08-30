import { Table } from "@mantine/core";

import { IColumnHeader } from "@/types/entityCollections";

import TableRow from "./TableRow/TableRow";
import TableHeadCell from "./TableHeadCell/TableHeadCell";

type Props = {
  rows?: any[];
  columnHeaders: IColumnHeader[];
  selectedRow?: any;
  onRowSelect?: Function;
  onSort?: Function;
};

/**
 * @param {any} columnHeaders - example: columnHeaders = [
  { name: "My name", isSortable:false, isActive: false, cellField: "myField.myField" }, 
 * @param {any} selectedRow - Has to contain id, similar to 
 * rows param objects
 */
export default function BaseTable({
  rows,
  selectedRow,
  columnHeaders,
  onRowSelect,
  onSort,
}: Props) {
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
              />
            ))}
        </tr>
      </thead>
      <tbody>
        {rows?.length ? (
          rows.map((rowData) => (
            <TableRow
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
