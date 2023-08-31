import axios from 'axios';
import { IProduct } from '../../types/Product';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const api = axios.create({
  baseURL: apiBaseUrl,
});

export const fetchProducts = async (): Promise<IProduct[]> => {
  const response = await api.get('/');
  return response.data;
};
export const createProduct = async (
  productData: IProduct,
): Promise<IProduct> => {
  const response = await api.post('/', productData);
  return response.data;
};

export const deleteProductFromServer = async (
  productId: number,
): Promise<void> => {
  await api.delete(`${productId}`);
};

export const updateProductOnServer = async (
  product: IProduct,
): Promise<void> => {
  await api.put(`${product.id}`, product);
};
