import React from 'react';
import { IProduct } from '../../types/Product';

interface ActionColumnCellProps {
  product: IProduct;
  handleEdit: (product: IProduct) => void;
  handleDelete: (productId: number) => void;
}

function ActionColumnCell({
  product,
  handleEdit,
  handleDelete,
}: ActionColumnCellProps) {
  <div className="action-buttons">
    <button type="button" onClick={() => handleEdit(product)}>
      edit
    </button>
    <button type="button" onClick={() => handleDelete(product.id)}>
      delete
    </button>
  </div>;
}

export default ActionColumnCell;
