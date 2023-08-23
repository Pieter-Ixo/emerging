import { IAssetColumnSorter } from "@/types/entityCollections";

import TableCell from "../TableCell/TableCell";

type Props = {
  columnSorters: IAssetColumnSorter[];
  onRowSelect: Function;
  rowData: any;
};

export default function TableRow({
  columnSorters,
  onRowSelect,
  rowData,
}: Props) {
  return (
    <tr onClick={onRowSelect(rowData)}>
      {columnSorters.map(({ name, isActive, cellField }) => (
        <TableCell key={name} isActive={isActive}>
          {cellField ? rowData[cellField] : 0}
        </TableCell>
      ))}
    </tr>
  );
}
