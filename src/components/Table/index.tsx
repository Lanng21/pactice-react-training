import React from 'react';
import { IProduct } from '../../types/Product';

interface TableProps {
  products: IProduct[];
}

function Table({ products }: TableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Status</th>
          <th>Type</th>
          <th>Quantity</th>
          <th>Brand</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.quantity}</td>
            <td>{product.price}</td>
            <td>{product.status}</td>
            <td>{product.type}</td>
            <td>{product.brand}</td>
            <td>{product.brandImage}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
