import { IColumnHeader } from "@/types/entityCollections";
import getNestedField from "@/utils/objects/getNestedField";

import TableCellUpdated from "../TableCell/TableCellUpdated";

type Props<T> = {
  columnHeaders: IColumnHeader[];
  // eslint-disable-next-line no-unused-vars
  onRowSelect?: (rowData: T) => void;
  isSelected?: boolean;
  rowData: T;
  centerCells?: boolean;
};

export default function TableRowUpdated<T>({
  columnHeaders,
  onRowSelect,
  rowData,
  isSelected,
  centerCells,
}: Props<T>) {
  return (
    <tr onClick={() => onRowSelect?.(rowData)}>
      {columnHeaders?.map(({ name, cellField, sortOrder }) => {
        if (typeof cellField !== "string") {
          return (
            <TableCellUpdated
              centerCells={centerCells}
              key={name}
              sortOrder={sortOrder}
            >
              Incorrect data format
            </TableCellUpdated>
          );
        }
        if (!cellField?.includes("."))
          return (
            <TableCellUpdated
              centerCells={centerCells}
              key={name}
              sortOrder={sortOrder}
              isSelected={isSelected}
            >
              {cellField ? rowData[cellField] : ""}
            </TableCellUpdated>
          );

        const cellFieldData = getNestedField(cellField, rowData);

        if (cellFieldData === undefined) {
          return (
            <TableCellUpdated
              centerCells={centerCells}
              sortOrder={sortOrder}
              key={name}
            />
          );
        }

        return (
          <TableCellUpdated
            centerCells={centerCells}
            sortOrder={sortOrder}
            key={name}
            isSelected={isSelected}
          >
            {cellFieldData}
          </TableCellUpdated>
        );
      })}
    </tr>
  );
}
