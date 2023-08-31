import React, { memo, useCallback, useState } from 'react';

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

  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  const renderPaginationItems = () => {
    const paginationItems = [];

    let startPage = Math.max(currentPage - 1, 1);
    const endPage = Math.min(startPage + 2, totalPageCount);

    if (endPage - startPage < 2) {
      startPage = Math.max(endPage - 2, 1);
    }

    if (startPage > 1) {
      paginationItems.push(1);
      if (startPage > 2) {
        paginationItems.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i += 1) {
      paginationItems.push(i);
    }

    if (endPage < totalPageCount) {
      if (endPage < totalPageCount - 1) {
        paginationItems.push('...');
      }
      paginationItems.push(totalPageCount);
    }

    return paginationItems.map((item, index) => {
      let key;
      if (typeof item === 'number') {
        key = `pagination-page-${item}`;
      } else {
        key = `pagination-${index}`;
      }
      return (
        <Button
          key={key}
          onClick={() => {
            if (typeof item === 'number') {
              handlePageChange(item);
            }
          }}
          className={`pagination-button ${
            currentPage === item ? 'active' : ''
          }`}
        >
          {item}
        </Button>
      );
    });
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

      <div className="pagination">{renderPaginationItems()}</div>
    </div>
  );
};

export default memo(Table);
