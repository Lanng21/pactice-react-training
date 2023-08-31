import { IProduct } from '../types/Product';

interface FormErrors {
  [key: string]: string;
}

const validateForm = (formData: IProduct): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.name) {
    errors.name = 'Name is required';
  }

  if (formData.quantity < 0) {
    errors.quantity = 'Quantity must be a positive number';
  }

  if (!formData.price) {
    errors.price = 'Price is required';
  } else {
    const pricePattern = /^\$\d+(\.\d{2})?$/;
    if (!pricePattern.test(formData.price)) {
      errors.price = 'Invalid price format';
    }
  }

  if (!formData.status) {
    errors.status = 'Status is required';
  }

  if (!formData.type) {
    errors.type = 'Type is required';
  }

  if (!formData.brand) {
    errors.brand = 'Brand is required';
  }

  if (!formData.brandImage) {
    errors.brandImage = 'Brand Image is required';
  } else {
    // const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg'];
    // const validImageExtension = imageExtensions.some((ext) =>
    //   formData.brandImage.toLowerCase().endsWith(ext),
    // );
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    if (!urlPattern.test(formData.brandImage)) {
      errors.brandImage = 'Invalid URL format for Brand Image';
    }

    if (!urlPattern) {
      errors.brandImage = 'Invalid Brand Image format';
    }
  }

  return errors;
};

export default validateForm;
