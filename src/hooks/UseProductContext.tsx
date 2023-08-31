import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';

// services
import {
  fetchProducts,
  createProduct,
  deleteProductFromServer,
  updateProductOnServer,
} from '../store/product/api';

// types
import { IProduct } from '../types/Product';

import Notification from '../components/Notification/index';
import {
  MESSAGE_NOTIFICATION_ERROR,
  MESSAGE_NOTIFICATION_SUCCESS,
  Type,
} from '../constant/notification';

interface ProductProviderProps {
  children: ReactNode;
}

interface ProductState {
  products: IProduct[];
}

interface ProductActions {
  addProduct: (newProduct: IProduct) => void;
  updateProduct: (updatedProduct: IProduct) => void;
  deleteProduct: (productId: number) => void;
}

type ProductContextData = ProductState & ProductActions;

const ProductContext = createContext<ProductContextData | undefined>(undefined);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [notification, setNotification] = useState<{
    type: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        setNotification({
          type: Type.Error,
          message: MESSAGE_NOTIFICATION_ERROR.GET_PRODUCTS,
        });
      }
    };

    fetchData();
  }, []);

  const addProduct = useCallback(
    async (newProduct: IProduct) => {
      try {
        await createProduct(newProduct);
        setProducts((prevProducts) => [newProduct, ...prevProducts]);
        setNotification({
          type: Type.Success,
          message: MESSAGE_NOTIFICATION_SUCCESS.ADD_PRODUCT,
        });
      } catch (error) {
        setNotification({
          type: Type.Error,
          message: MESSAGE_NOTIFICATION_ERROR.ADD_PRODUCT,
        });
      }
    },
    [setProducts],
  );

  const updateProduct = useCallback(
    async (updatedProduct: IProduct) => {
      try {
        await updateProductOnServer(updatedProduct);
        setProducts((prevProducts) => [
          ...prevProducts.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product,
          ),
        ]);
        setNotification({
          type: Type.Success,
          message: MESSAGE_NOTIFICATION_SUCCESS.UPDATE_PRODUCT,
        });
      } catch (error) {
        setNotification({
          type: Type.Error,
          message: MESSAGE_NOTIFICATION_ERROR.UPDATE_PRODUCT,
        });
      }
    },
    [setProducts],
  );

  const deleteProduct = useCallback(
    async (productId: number) => {
      try {
        await deleteProductFromServer(productId);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId),
        );
      } catch (error) {
        setNotification({
          type: Type.Error,
          message: MESSAGE_NOTIFICATION_ERROR.DELETE_PRODUCT,
        });
      }
    },
    [setProducts],
  );

  const contextValue = useMemo(
    () => ({
      products,
      addProduct,
      updateProduct,
      deleteProduct,
    }),
    [products, addProduct, updateProduct, deleteProduct],
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
      {children}
    </ProductContext.Provider>
  );
};
