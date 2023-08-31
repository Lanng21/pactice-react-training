import React, { memo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// components
import DetailForm from './components/FormDetailPage';

// hooks
import { useProductContext } from '../../hooks/UseProductContext';

// types
import { IProduct } from '../../types/Product';

const ProductDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const { products, updateProduct } = useProductContext();

  const selectedProduct = products.find(
    (product) => product.id.toString() === productId,
  );

  const handleFormSubmit = (formData: IProduct) => {
    updateProduct(formData);
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="product-detail-container">
      {selectedProduct ? (
        <DetailForm
          onSubmit={handleFormSubmit}
          onBack={handleBack}
          product={selectedProduct}
        />
      ) : (
        <div className="loading">Loading or error message...</div>
      )}
    </div>
  );
};

export default memo(ProductDetailPage);
