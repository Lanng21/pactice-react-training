import axios from 'axios';
import { IProduct } from '../../types/Product';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const api = axios.create({
  baseURL: apiBaseUrl,
});

export const fetchProducts = async (): Promise<IProduct[]> => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch product');
  }
};
export const createProduct = async (
  productData: IProduct,
): Promise<IProduct> => {
  try {
    const response = await api.post('/', productData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create product');
  }
};

export const deleteProductFromServer = async (
  productId: number,
): Promise<void> => {
  try {
    await api.delete(`${productId}`);
  } catch (error) {
    throw new Error('Failed to delete product');
  }
};

export const updateProductOnServer = async (
  product: IProduct,
): Promise<void> => {
  await api.put(`${product.id}`, product);
};
