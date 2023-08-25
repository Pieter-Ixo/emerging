import { Table } from "@mantine/core";

import { IColumnHeader } from "@/types/entityCollections";

import TableRow from "./TableRow/TableRow";
import TableHeadCell from "./TableHeadCell/TableHeadCell";

type Props = {
  rows?: any[];
  columnHeaders: IColumnHeader[];
  onRowSelect: Function;
  onSort: Function;
};

export default function BaseTable({
  rows,
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
