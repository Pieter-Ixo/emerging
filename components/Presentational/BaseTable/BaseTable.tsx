import { IAssetColumnSorter } from "@/types/entityCollections";
import { Loader, Table } from "@mantine/core";
import TableRow from "./TableRow/TableRow";
import TableHead from "./TableHead/TableHead";

type Props = {
  rows?: any[];
  columnSorters: IAssetColumnSorter[];
  onRowSelect: Function;
  onSort: Function;
};

export default function BaseTable({
  rows,
  columnSorters,
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
          {columnSorters?.length &&
            columnSorters.map((columnSorter, sorterIndex) => (
              <TableHead
                key={columnSorter.name}
                sorterIndex={sorterIndex}
                columnSorter={columnSorter}
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
              columnSorters={columnSorters}
            />
          ))
        ) : (
          <tr style={{ textAlign: "center" }}>
            <td style={{ paddingTop: 20 }} colSpan={columnSorters.length}>
              <Loader />
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}
