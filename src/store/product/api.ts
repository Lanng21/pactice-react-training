import axios from 'axios';
import { IProduct } from '../../types/Product';

const API_BASE_URL = 'http://localhost:5000';
const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchProducts = async (): Promise<IProduct[]> => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};
export const createProduct = async (
  productData: IProduct,
): Promise<IProduct> => {
  try {
    const response = await api.post('/products', productData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create product');
  }
};

export const deleteProductFromServer = async (
  productId: number,
): Promise<void> => {
  try {
    await api.delete(`/products/${productId}`);
  } catch (error) {
    throw new Error('Failed to delete product');
  }
};

export const updateProductOnServer = async (
  product: IProduct,
): Promise<void> => {
  await api.put(`/products/${product.id}`, product);
};
