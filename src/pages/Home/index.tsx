import React, { useCallback, useState } from 'react';

// hooks
import { useProductContext } from '../../hooks/ProductContext';

// components
import Button from '../../components/Button';
import Table from '../../components/Table';
import DeleteConfirmModal from '../../components/DeleteConfirmModal';
import DeleteSuccessModal from '../../components/DeleteSuccessModal';
import AddProduct from './components/AddProduct';

// types
import { IProduct } from '../../types/Product';

const Home = () => {
  const { products, addProduct, updateProduct, deleteProduct } =
    useProductContext();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleConfirmDelete = useCallback(() => {
    setIsDeleteConfirmationModalOpen(false);
    if (selectedProduct) {
      deleteProduct(selectedProduct.id);
      setSelectedProduct(null);
      setIsSuccessModalOpen(true);
    }
  }, [deleteProduct, selectedProduct]);

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
          <button
            type="button"
            onClick={() => {
              setSelectedProduct(product);
              setIsDeleteConfirmationModalOpen(true);
            }}
          >
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
        <AddProduct
          onClose={closeModal}
          onSubmit={handleSubmit}
          selectedProduct={selectedProduct as IProduct}
        />
      )}
      {isDeleteConfirmationModalOpen && (
        <DeleteConfirmModal
          onClose={() => setIsDeleteConfirmationModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
      {isSuccessModalOpen && (
        <DeleteSuccessModal onClose={() => setIsSuccessModalOpen(false)} />
      )}
      <Table columns={columns} data={products} />
    </div>
  );
};

export default Home;
