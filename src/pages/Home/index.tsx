import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// store
import {
  setProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} from '../../store/product/productSlice';
import {
  fetchProducts,
  createProduct,
  deleteProductFromServer,
  updateProductOnServer,
} from '../../store/product/api';
import { RootState } from '../../store/product/store';
import { IProduct } from '../../types/Product';

// components
import ModalForm from '../../components/Form';
import Button from '../../components/Button';
import Table from '../../components/Table';

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const productsData: IProduct[] = await fetchProducts();
        dispatch(setProducts(productsData));
      } catch (error) {
        throw new Error('Failed to fetch products');
      }
    }
    fetchData();
  }, [dispatch]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleSubmit = async (formData: IProduct) => {
    if (selectedProduct) {
      try {
        const updatedProduct: IProduct = {
          ...selectedProduct,
          ...formData,
        };
        await updateProductOnServer(updatedProduct);
        dispatch(updateProduct(updatedProduct));
      } catch (error) {
        throw new Error('Failed to update product');
      }
    } else {
      try {
        const newProduct: IProduct = {
          ...formData,
          id: Date.now(),
        };
        await createProduct(newProduct);
        dispatch(addProduct(newProduct));
      } catch (error) {
        throw new Error('Failed to create product');
      }
    }
    closeModal();
  };

  const handleEdit = (product: IProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (productId: number) => {
    try {
      await deleteProductFromServer(productId);
      dispatch(deleteProduct(productId));
    } catch (error) {
      throw new Error('Failed to delete product');
    }
  };

  const columns = [
    {
      key: 'name',
      header: 'Product',
      render: (product: IProduct) => product.name,
    },
    {
      key: 'status',
      header: 'Status',
      render: (product: IProduct) => product.status,
    },
    {
      key: 'type',
      header: 'Type',
      render: (product: IProduct) => product.type,
    },
    {
      key: 'quantity',
      header: 'Quantity',
      render: (product: IProduct) => product.quantity,
    },
    {
      key: 'brand',
      header: 'Brand',
      render: (product: IProduct) => product.brand,
    },
    {
      key: 'price',
      header: 'Price',
      render: (product: IProduct) => product.price,
    },
    {
      key: 'action',
      header: 'Action',
      render: (product: IProduct) => (
        <div className="action-buttons">
          <button type="button" onClick={() => handleEdit(product)}>
            edit
          </button>
          <button type="button" onClick={() => handleDelete(product.id)}>
            delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container">
      <h1>Management</h1>
      <div className="button-add">
        <Button onClick={openModal}>Add new product</Button>
      </div>
      {isModalOpen && (
        <div className="overlay">
          <div className="overlay">
            <ModalForm
              onClose={closeModal}
              onSubmit={handleSubmit}
              selectedProduct={selectedProduct as IProduct}
            />
          </div>
        </div>
      )}
      <Table columns={columns} data={products} />
    </div>
  );
}

export default Home;
