import React, { useCallback, useEffect, useMemo, useState } from 'react';

// Components
import ModalForm from '../../../../components/Form';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Select from '../../../../components/Select';

// Types
import { IProduct } from '../../../../types/Product';

// Utils
import validateForm from '../../../../utils/validate';

interface AddProductProps {
  onSubmit: (formData: IProduct) => void;
  selectedProduct: IProduct;
  onClose: () => void;
}

const AddProduct = ({
  onSubmit,
  onClose,
  selectedProduct,
}: AddProductProps) => {
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

  useEffect(() => {
    if (selectedProduct) {
      setFormData(selectedProduct);
    }
  }, [selectedProduct]);

  const handleCancelClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const isEditing = useMemo(() => !!selectedProduct, [selectedProduct]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    },
    [],
  );

  const handleSubmit = useCallback(() => {
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      onSubmit(formData);
      onClose();
    }
  }, [formData, onSubmit, onClose]);

  return (
    <ModalForm
      onClose={onClose}
      title={isEditing ? 'Product Information' : 'Add New Product'}
    >
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
        />

        <Input
          label="Quantity"
          id="quantity"
          className="select-option quantity"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleInputChange}
        />

        <Input
          label="Price"
          id="price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleInputChange}
        />

        <div className="status">
          <Select
            label="Status"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select Status
            </option>
            <option value="available" className="select-option available">
              Available
            </option>
            <option value="sold-out" className="select-option sold-out">
              Sold out
            </option>
          </Select>

          <Select
            label="Type"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select Type
            </option>
            <option value="electronic">Electronic</option>
            <option value="clothing">Clothing</option>
          </Select>
        </div>
        <div className="brand">
          <Input
            label="Brand"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
            type="text"
          />
          <Input
            label="Brand Image"
            id="brandImage"
            name="brandImage"
            value={formData.brandImage}
            onChange={handleInputChange}
            type="text"
          />
        </div>
        <div className="button">
          <Button kind="primary" className="cancel" onClick={handleCancelClick}>
            Cancel
          </Button>
          <Button kind="secondary" className="submit" onClick={handleSubmit}>
            Confirm
          </Button>
        </div>
      </form>
    </ModalForm>
  );
};

export default AddProduct;
