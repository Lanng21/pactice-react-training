import React, { useState, useCallback } from 'react';

// types
import { IProduct } from '../../../../types/Product';

// validators
import validateForm from '../../../../utils/validate';

// components
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';

interface DetailFormProps {
  onSubmit: (formData: IProduct) => void;
  onBack: () => void;
  product: IProduct;
}

const DetailForm: React.FC<DetailFormProps> = ({
  product,
  onSubmit,
  onBack,
}) => {
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<IProduct>(product);

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

  const handleFormSubmit = useCallback(() => {
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      onSubmit(formData);
    } else {
      setFormErrors(errors);
    }
  }, [formData, onSubmit]);

  return (
    <div className="detail-form">
      <h2 className="title">{formData.name}</h2>
      <div className="detail">
        <form className="form-detail" onSubmit={handleFormSubmit}>
          <Input
            label="Name"
            id="name"
            name="name"
            type="text"
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
            value={formData.quantity}
            error={formErrors.quantity}
            onChange={handleInputChange}
          />

          <Input
            label="Price"
            id="price"
            name="price"
            type="number"
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
              value={formData.brand}
              onChange={handleInputChange}
              type="text"
              error={formErrors.brand}
            />
            <Input
              label="Brand Image"
              id="brandImage"
              name="brandImage"
              value={formData.brandImage}
              onChange={handleInputChange}
              type="text"
              error={formErrors.brandImage}
            />
          </div>
          <div className="button">
            <Button kind="primary" className="back" onClick={onBack}>
              Back
            </Button>
            <Button
              kind="secondary"
              className="submit"
              onClick={handleFormSubmit}
            >
              Save
            </Button>
          </div>
        </form>

        <figure>
          <img
            src={product.brandImage}
            alt={product.name}
            className="product-image detail-image"
          />
        </figure>
      </div>
    </div>
  );
};

export default DetailForm;