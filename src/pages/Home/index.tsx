import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

// hooks
import { useProductContext } from '../../hooks/UseProductContext';

// components
import Button from '../../components/Button';
import Table from '../../components/Table';
import DeleteConfirmModal from '../../components/DeleteConfirmModal';
import DeleteSuccessModal from '../../components/DeleteSuccessModal';
import AddProduct from './components/AddProduct';
import Tag from '../../components/Tag';

// types
import { IProduct } from '../../types/Product';

// icons
import Action from '../../assets/images/icons8-more.svg';

const Home = () => {
  const { products, addProduct, updateProduct, deleteProduct } =
    useProductContext();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);

  const [showDropdownProductId, setShowDropdownProductId] = useState<
    number | null
  >(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleEllipsisClick = useCallback((productId: number) => {
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
    setShowDropdownProductId(productId);
  }, []);

  const closeDropdown = useCallback(() => {
    setShowDropdown(false);
    setShowDropdownProductId(null);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    setIsDeleteConfirmationModalOpen(false);
    if (selectedProduct) {
      deleteProduct(selectedProduct.id);
      setSelectedProduct(null);
      setIsSuccessModalOpen(true);
    }
  }, [deleteProduct, selectedProduct]);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  }, []);

  const handleSubmit = useCallback(
    (formData: IProduct) => {
      if (selectedProduct) {
        updateProduct({ ...selectedProduct, ...formData });
      } else {
        const newProduct: IProduct = {
          ...formData,
          id: Date.now(),
        };
        addProduct(newProduct);
      }
      closeModal();
    },
    [addProduct, closeModal, selectedProduct, updateProduct],
  );

  const handleEdit = useCallback(
    (product: IProduct) => {
      setSelectedProduct(product);
      setIsModalOpen(true);
      closeDropdown();
    },
    [closeDropdown],
  );

  const handleRowClick = useCallback(
    (productId: number) => {
      const foundProduct = products.find(
        (product: IProduct) => product.id === productId,
      );
      setSelectedProduct(foundProduct || null);
    },
    [products],
  );

  const columns = useMemo(
    () => [
      {
        key: 'product',
        header: 'Product',
        render: (product: IProduct) => (
          <Link
            to={`/detail/${product.id}`}
            onClick={() => handleRowClick(product.id)}
          >
            <div className="product-cell">
              <img
                src={product.brandImage}
                alt={product.name}
                className="product-image table-image"
              />
              <span className="product-name">{product.name}</span>
            </div>
          </Link>
        ),
      },
      {
        key: 'status',
        header: 'Status',
        render: (product: IProduct) => <Tag status={product.status} />,
      },
      {
        key: 'type',
        header: 'Type',
      },
      {
        key: 'quantity',
        header: 'Quantity',
        render: (product: IProduct) => (
          <span className="quantity">{product.quantity}</span>
        ),
      },
      {
        key: 'brand',
        header: 'Brand',
      },
      {
        key: 'price',
        header: 'Price',
        render: ({ price }) => <span>{`$${price}`} </span>,
      },
      {
        key: 'action',
        header: 'Action',
        render: (product: IProduct) => (
          <div className="action-buttons">
            <Button
              className="ellipsis-button"
              onClick={() => handleEllipsisClick(product.id)}
            >
              <span className="ellipsis-icon">
                <img src={Action} alt="action" />
              </span>
            </Button>
            {showDropdown && showDropdownProductId === product.id && (
              <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
                <Button
                  className="edit-button"
                  onClick={() => {
                    handleEdit(product);
                    closeDropdown();
                  }}
                >
                  Edit
                </Button>
                <Button
                  className="delete-button"
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsDeleteConfirmationModalOpen(true);
                    closeDropdown();
                  }}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        ),
      },
    ],
    [
      handleRowClick,
      showDropdown,
      showDropdownProductId,
      handleEllipsisClick,
      handleEdit,
      closeDropdown,
    ],
  );

  return (
    <div className="container">
      <h1 className="title-home">Management</h1>
      <div className="button-add">
        <Button onClick={openModal}>Add new product</Button>
      </div>
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner" aria-label="Loading" />
        </div>
      ) : (
        <>
          {isModalOpen && (
            <AddProduct
              onClose={closeModal}
              onSubmit={handleSubmit}
              selectedProduct={selectedProduct as IProduct}
            />
          )}
          {isDeleteConfirmationModalOpen && (
            <DeleteConfirmModal
              onClose={() => setIsDeleteConfirmationModalOpen(false)}
              onConfirm={handleConfirmDelete}
            />
          )}
          {isSuccessModalOpen && (
            <DeleteSuccessModal onClose={() => setIsSuccessModalOpen(false)} />
          )}
          <Table columns={columns} data={products} itemsPerPage={5} />
        </>
      )}
    </div>
  );
};

export default memo(Home);
