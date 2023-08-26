import React, { useState } from 'react';
// components
import Button from '../Button';
// types
import { IProduct } from '../../types/Product';
// import { IFormData } from '../../types/Product';

// icon
import Clear from '../../assets/images/x-close.svg';

interface ModalFormProps {
  onClose: () => void;
  onSubmit: (formData: IProduct) => void;
}

function ModalForm({ onClose, onSubmit }: ModalFormProps) {
  const [formData, setFormData] = useState<IProduct>({
    name: '',
    quantity: 0,
    price: 0,
    status: '',
    type: '',
    brand: '',
    brandImage: '',
    id: 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  const handleCancelClick = () => {
    onClose();
  };

  return (
    <div className="modal-form">
      <div className="header-form">
        <h5>Add new product</h5>
        <button type="button" onClick={handleCancelClick}>
          <img src={Clear} alt="close" />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="quantity">
          Quantity
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </label>
        <div className="status">
          <label htmlFor="status">
            Status
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="">Select status</option>
              <option value="available">Available</option>
              <option value="outOfStock">Out of Stock</option>
            </select>
          </label>
          <label htmlFor="type">
            Type
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
            >
              <option value="">Select type</option>
              <option value="electronic">Electronic</option>
              <option value="clothing">Clothing</option>
            </select>
          </label>
        </div>
        <div className="brand">
          <label htmlFor="brand">
            Brand
            <input
              placeholder="Enter brand..."
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor="brandImage">
            Brand Image
            <input
              type="text"
              id="brandImage"
              name="brandImage"
              value={formData.brandImage}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="button">
          <Button
            kind="primary"
            type="button"
            className="cancel"
            onClick={handleCancelClick}
          >
            Cancel
          </Button>
          <Button
            kind="secondary"
            type="submit"
            className="submit"
            onClick={handleSubmit}
          >
            Confirm
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ModalForm;
