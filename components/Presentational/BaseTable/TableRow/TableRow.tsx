import { IColumnHeader } from "@/types/entityCollections";
import getNestedField from "@/utils/objects/getNestedField";

import TableCell from "../TableCell/TableCell";

type Props<T> = {
  columnHeaders: IColumnHeader[];
  onRowSelect?: Function;
  isSelected?: boolean;
  rowData: T;
};

export default function TableRow({
  columnHeaders,
  onRowSelect,
  rowData,
  isSelected,
}: Props<any>) {
  return (
    <tr onClick={() => onRowSelect && onRowSelect(rowData)}>
      {columnHeaders?.map(({ name, isActive, cellField }) => {
        if (typeof cellField !== "string") {
          return (
            <TableCell key={name} isActive={isActive}>
              Incorrect data format
            </TableCell>
          );
        }
        if (!cellField?.includes("."))
          return (
            <TableCell key={name} isSelected={isSelected} isActive={isActive}>
              {cellField ? rowData[cellField] : ""}
            </TableCell>
          );

        const cellFieldData = getNestedField(cellField, rowData);

        if (cellFieldData === undefined) {
          return <TableCell key={name} isActive={isActive} />;
        }

        return (
          <TableCell key={name} isSelected={isSelected} isActive={isActive}>
            {cellFieldData}
          </TableCell>
        );
      })}
    </tr>
  );
}
