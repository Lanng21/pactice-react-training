import React, { memo, useState } from 'react';

// components
import Button from '../Button';

// types
import { IProduct } from '../../types/Product';

interface Column {
  key: string;
  header: string;
  render?: (data: IProduct) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: IProduct[];
  itemsPerPage: number;
}

const Table = ({ columns, data, itemsPerPage }: TableProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPageCount = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(startIndex, endIndex).map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render
                    ? column.render(row)
                    : row[column.key as keyof IProduct]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPageCount }).map((_, index) => (
          <Button
            key={index as number}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default memo(Table);
