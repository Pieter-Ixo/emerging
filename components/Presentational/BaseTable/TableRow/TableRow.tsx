import { IColumnHeader } from "@/types/entityCollections";
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
      {columnHeaders &&
        columnHeaders.map(({ name, isActive, cellField }) => (
          <TableCell key={name} isActive={isActive}>
            {cellField ? rowData[cellField] : "Data not found"}
          </TableCell>
        ))}
    </tr>
  );
}
