import { IColumnHeader } from "@/types/entityCollections";
import getNestedField from "@/utils/objects/getNestedField";

import TableCell from "../TableCell/TableCell";

type Props<T> = {
  columnHeaders: IColumnHeader[];
  // eslint-disable-next-line no-unused-vars
  onRowSelect?: (rowData: T) => void;
  isSelected?: boolean;
  rowData: T;
  centerCells?: boolean;
};

export default function TableRow<T>({
  columnHeaders,
  onRowSelect,
  rowData,
  isSelected,
  centerCells,
}: Props<T>) {
  return (
    <tr onClick={() => onRowSelect?.(rowData)}>
      {columnHeaders?.map(({ name, isActive, cellField }) => {
        if (typeof cellField !== "string") {
          return (
            <TableCell centerCells={centerCells} key={name} isActive={isActive}>
              Incorrect data format
            </TableCell>
          );
        }
        if (!cellField?.includes("."))
          return (
            <TableCell
              centerCells={centerCells}
              key={name}
              isSelected={isSelected}
              isActive={isActive}
            >
              {cellField ? rowData[cellField] : ""}
            </TableCell>
          );

        const cellFieldData = getNestedField(cellField, rowData);

        if (cellFieldData === undefined) {
          return (
            <TableCell
              centerCells={centerCells}
              key={name}
              isActive={isActive}
            />
          );
        }

        return (
          <TableCell
            centerCells={centerCells}
            key={name}
            isSelected={isSelected}
            isActive={isActive}
          >
            {cellFieldData}
          </TableCell>
        );
      })}
    </tr>
  );
}
