import { IProduct } from '../types/Product';

interface FormErrors {
  [key: string]: string;
}

const validateForm = (formData: IProduct): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.name) {
    errors.name = 'Name is required';
  }

  if (formData.quantity <= 0) {
    errors.quantity = 'Quantity must be a positive number';
  }

  if (formData.price <= 0) {
    errors.price = 'Price must be a positive number';
  }

  if (!formData.status) {
    errors.status = 'Status is required';
  }

  if (!formData.type) {
    errors.type = 'Type is required';
  }

  return errors;
};

export default validateForm;
