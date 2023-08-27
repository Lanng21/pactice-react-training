import React, { useCallback, useState } from 'react';
// hooks
import { useProductContext } from '../../hooks/ProductContext';
// components
import ModalForm from '../../components/Form';
import Button from '../../components/Button';
import Table from '../../components/Table';
// types
import { IProduct } from '../../types/Product';

function Home() {
  const { products, addProduct, updateProduct, deleteProduct } =
    useProductContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  }, []);

  const handleSubmit = useCallback(
    (formData: IProduct) => {
      if (selectedProduct) {
        updateProduct({ ...selectedProduct, ...formData });
      } else {
        const newProduct: IProduct = {
          ...formData,
          id: Date.now(),
        };
        addProduct(newProduct);
      }
      closeModal();
    },
    [addProduct, closeModal, selectedProduct, updateProduct],
  );

  const handleEdit = useCallback((product: IProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  const handleDelete = useCallback(
    (productId: number) => {
      deleteProduct(productId);
    },
    [deleteProduct],
  );

  const columns = [
    {
      key: 'name',
      header: 'Product',
      render: (product: IProduct) => product.name,
    },
    {
      key: 'status',
      header: 'Status',
      render: (product: IProduct) => product.status,
    },
    {
      key: 'type',
      header: 'Type',
      render: (product: IProduct) => product.type,
    },
    {
      key: 'quantity',
      header: 'Quantity',
      render: (product: IProduct) => product.quantity,
    },
    {
      key: 'brand',
      header: 'Brand',
      render: (product: IProduct) => product.brand,
    },
    {
      key: 'price',
      header: 'Price',
      render: (product: IProduct) => product.price,
    },
    {
      key: 'action',
      header: 'Action',
      render: (product: IProduct) => (
        <div className="action-buttons">
          <button type="button" onClick={() => handleEdit(product)}>
            edit
          </button>
          <button type="button" onClick={() => handleDelete(product.id)}>
            delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container">
      <h1 className="title">Management</h1>
      <div className="button-add">
        <Button onClick={openModal}>Add new product</Button>
      </div>
      {isModalOpen && (
        <div className="overlay">
          <div className="overlay">
            <ModalForm
              onClose={closeModal}
              onSubmit={handleSubmit}
              selectedProduct={selectedProduct as IProduct}
            />
          </div>
        </div>
      )}
      <Table columns={columns} data={products} />
    </div>
  );
}

export default Home;
