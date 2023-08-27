import React, { memo } from 'react';
// types
import { IProduct } from '../../types/Product';

interface Column {
  key: string;
  header: string;
  render: (data: IProduct) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: IProduct[];
}

function Table({ columns, data }: TableProps) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td key={column.key}>{column.render(row)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default memo(Table);
