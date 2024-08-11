import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk("product,getProduct", async () => {
  const response = await axios.get("http://localhost:5000/products");
  return response.data;
});

export const saveProduct = createAsyncThunk(
  "product/saveProduct",
  async ({ barang, price }) => {
    const response = await axios.post("http://localhost:5000/products", {
      barang,
      price,
    });
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, barang, price }) => {
    const response = await axios.put(`http://localhost:5000/products/${id}`, {
      id,
      barang,
      price,
    });
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async ({ id }) => {
    const response = await axios.delete(`http://localhost:5000/products/${id}`);
    return response.data;
  }
);

const productEntry = createEntityAdapter({
  selectId: (product) => product.id,
});

const productSlice = createSlice({
  name: "product",
  initialState: productEntry.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.fulfilled, (state, action) => {
        productEntry.setAll(state, action.payload);
      })
      .addCase(saveProduct.fulfilled, (state, action) => {
        productEntry.addOne(state, action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        productEntry.upsertOne(state, {
          id: action.payload.id,
          changes: action.payload,
        });
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        productEntry.removeOne(state, action.payload.id);
      });
  },
});

export const productSelector = productEntry.getSelectors(
  (state) => state.product
);
export default productSlice.reducer;
