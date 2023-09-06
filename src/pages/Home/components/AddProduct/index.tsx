import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

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
  const initialFormData = useMemo(
    () => ({
      name: '',
      quantity: 0,
      price: 0,
      status: '',
      type: '',
      brand: '',
      brandImage: '',
      id: 0,
    }),
    [],
  );

  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<IProduct>(initialFormData);

  useEffect(() => {
    if (selectedProduct) {
      setFormData(selectedProduct);
    } else {
      setFormData(initialFormData);
    }
  }, [selectedProduct, initialFormData]);

  const handleCancelClick = useCallback(() => {
    onClose();
  }, [onClose]);

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
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onSubmit(formData);
        onClose();
      }, 1500);
    } else {
      setFormErrors(errors);
    }
  }, [formData, onSubmit, onClose]);

  return (
    <ModalForm
      onClose={onClose}
      title={selectedProduct ? 'Product Information' : 'Add New Product'}
    >
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          id="name"
          name="name"
          type="text"
          placeholder="Enter product name"
          value={formData.name}
          error={formErrors.name}
          onChange={handleInputChange}
        />

        <Input
          label="Quantity"
          id="quantity"
          className="select-option quantity"
          name="quantity"
          type="number"
          placeholder="Enter product quantity"
          value={formData.quantity}
          error={formErrors.quantity}
          onChange={handleInputChange}
        />

        <Input
          label="Price"
          id="price"
          name="price"
          type="number"
          placeholder="Enter product price"
          value={formData.price}
          error={formErrors.price}
          onChange={handleInputChange}
        />

        <div className="status">
          <Select
            label="Status"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            error={formErrors.status}
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
            error={formErrors.type}
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
            placeholder="Enter product brand"
            value={formData.brand}
            onChange={handleInputChange}
            type="text"
            error={formErrors.brand}
          />
          <Input
            label="Brand Image"
            id="brandImage"
            name="brandImage"
            placeholder="Enter product brand image"
            value={formData.brandImage}
            onChange={handleInputChange}
            type="text"
            error={formErrors.brandImage}
          />
        </div>
        <div className="button">
          <Button kind="primary" className="cancel" onClick={handleCancelClick}>
            Cancel
          </Button>
          <Button
            kind="secondary"
            className="submit"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Confirm'}
          </Button>
        </div>
      </form>
    </ModalForm>
  );
};

export default memo(AddProduct);
