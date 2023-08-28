import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';

// api
import {
  fetchProducts,
  createProduct,
  deleteProductFromServer,
  updateProductOnServer,
} from '../store/product/api';
// types
import { IProduct } from '../types/Product';

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

export function ProductProvider({ children }: ProductProviderProps) {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        throw new Error('Failed to fetch products');
      }
    };

    fetchData();
  }, []);

  const addProduct = useCallback(async (newProduct: IProduct) => {
    try {
      await createProduct(newProduct);
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    } catch (error) {
      throw new Error('Failed to create product');
    }
  }, []);

  const updateProduct = useCallback(async (updatedProduct: IProduct) => {
    try {
      await updateProductOnServer(updatedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product,
        ),
      );
    } catch (error) {
      throw new Error('Failed to update product');
    }
  }, []);

  const deleteProduct = useCallback(async (productId: number) => {
    try {
      await deleteProductFromServer(productId);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId),
      );
    } catch (error) {
      throw new Error('Failed to delete product');
    }
  }, []);

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
      {children}
    </ProductContext.Provider>
  );
}
