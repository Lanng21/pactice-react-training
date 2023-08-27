import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../../types/Product';

const productSlice = createSlice({
  name: 'products',
  initialState: [] as IProduct[],
  reducers: {
    setProducts: (state, action) => {
      return action.payload;
    },
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    deleteProduct: (state, action) => {
      return state.filter((product) => product.id !== action.payload);
    },
    updateProduct: (state, action) => {
      const updatedProductIndex = state.findIndex(
        (product) => product.id === action.payload.id,
      );

      if (updatedProductIndex !== -1) {
        const updatedProducts = [...state];
        updatedProducts.splice(updatedProductIndex, 1, action.payload);
        return updatedProducts;
      }

      return state;
    },
  },
});

export const { setProducts, addProduct, deleteProduct, updateProduct } =
  productSlice.actions;
export default productSlice.reducer;
