import React, { useState } from 'react';
// components
import ModalForm from '../../components/Form';
import Button from '../../components/Button';
// types
import { IProduct } from '../../types/Product';
import Table from '../../components/Table';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (formData: IProduct) => {
    const newProduct = {
      ...formData,
      id: Date.now(),
    };
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <div className="container">
      <h1>Product Management</h1>
      <Button onClick={openModal}>Open Modal</Button>
      {isModalOpen && (
        <div className="overlay">
          <ModalForm onClose={closeModal} onSubmit={handleSubmit} />
        </div>
      )}
      <Table products={products} />
    </div>
  );
}

export default Home;
