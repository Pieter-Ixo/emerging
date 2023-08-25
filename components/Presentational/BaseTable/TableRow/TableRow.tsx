import { IColumnHeader } from "@/types/entityCollections";
import getNestedField from "@/utils/objects/getNestedField";

import TableCell from "../TableCell/TableCell";

type Props = {
  columnHeaders: IColumnHeader[];
  onRowSelect: Function;
  rowData: any;
};

export default function TableRow({
  columnHeaders,
  onRowSelect,
  rowData,
}: Props) {
  return (
    <tr onClick={() => onRowSelect(rowData)}>
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
            <TableCell key={name} isActive={isActive}>
              {cellField ? rowData[cellField] : "Data not found"}
            </TableCell>
          );

        const cellFieldData = getNestedField(cellField, rowData);

        if (!cellFieldData) {
          return (
            <TableCell key={name} isActive={isActive}>
              0
            </TableCell>
          );
        }

        return (
          <TableCell key={name} isActive={isActive}>
            {cellFieldData}
          </TableCell>
        );
      })}
    </tr>
  );
}
