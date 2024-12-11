import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUniques } from "../../utils/products";
import { formatPrice } from "../../utils/format";
import {
  createProductThunk,
  deleteProductThunk,
  getAllProductsThunk,
  getSingleProductThunk,
  updateProductThunk,
} from "./productsThunk";
import { toast } from "react-toastify";

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  getAllProductsThunk
);
export const getSingleProduct = createAsyncThunk(
  "products/getSingleProduct",
  getSingleProductThunk
);
export const createProduct = createAsyncThunk(
  "products/createProduct",
  createProductThunk
);
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  updateProductThunk
);
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  deleteProductThunk
);

const initialFilters = {
  name: "",
  category: "",
  company: "",
  colors: [],
  price: "",
  freeShipping: false,
};

const initialState = {
  allProducts: [],
  allProductsCount: 0,
  singleProduct: null,
  singleProductReviews: [],
  singleProductTotalReviews: 0,
  products: [],
  totalProducts: 0,
  pages: 0,
  featuredProducts: [],
  isGrid: true,
  sort: "price",
  page: 1,
  filters: { ...initialFilters },
  filterLayout: {
    categories: [],
    companies: [],
    colors: [],
    prices: {},
  },
  allProductsTableColumns: [
    { field: "image", label: "Image" },
    { field: "productId", label: "Product ID" },
    { field: "name", label: "Name" },
    { field: "price", label: "Price" },
    { field: "category", label: "Category" },
    { field: "company", label: "Company" },
  ],
  allProductsTableData: [],
  status: {
    getAllProducts: { loading: true, error: null },
    getSingleProduct: { loading: true, error: null },
    createProduct: { loading: false, error: null },
    updateProduct: { loading: false, error: null },
    deleteProduct: { loading: false, error: null },
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setView: (state, action) => {
      state.isGrid = action.payload;
    },
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1;
    },
    updateSort: (state, action) => {
      state.sort = action.payload;
    },
    updatePage: (state, action) => {
      state.page = action.payload;
    },
    clearFilters: (state) => {
      state.filters = { ...initialFilters };
      state.sort = "price";
      state.page = 1;
    },
    clearAllProductStates: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.status.getAllProducts.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        const { products, nbhits, pages, featured, allProducts } =
          action.payload;
        state.products = [...products];
        state.totalProducts = nbhits;
        state.pages = pages;
        state.featuredProducts = featured;
        state.allProducts = allProducts;

        state.filterLayout.categories = getUniques(allProducts, "category");
        state.filterLayout.companies = getUniques(allProducts, "company");
        state.filterLayout.colors = getUniques(allProducts, "colors");
        state.filterLayout.prices = getUniques(allProducts, "prices");

        state.allProductsTableData = allProducts.map((product) => ({
          image: product.images[0].url,
          productId: product._id,
          name: product.name,
          price: formatPrice(product.price),
          category: product.category,
          company: product.company,
        }));

        state.status.getAllProducts.loading = false;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        toast.error(action.payload);
        state.status.getAllProducts.loading = false;
        state.status.getAllProducts.error = action.payload;
      })
      .addCase(getSingleProduct.pending, (state) => {
        state.status.getSingleProduct.loading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.singleProduct = { ...action.payload };
        state.status.getSingleProduct.loading = false;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.status.getSingleProduct.loading = false;
        state.status.getSingleProduct.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(createProduct.pending, (state) => {
        state.status.createProduct.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status.createProduct.loading = false;
        toast.success(action.payload.msg);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status.createProduct.loading = false;
        state.status.createProduct.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status.deleteProduct.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status.deleteProduct.loading = false;
        toast.success(action.payload.msg);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status.deleteProduct.loading = false;
        state.status.deleteProduct.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateProduct.pending, (state) => {
        state.status.updateProduct.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status.updateProduct.loading = false;
        toast.success("Product updated successfully...");
      })
      .addCase(updateProduct.rejected, (state, action) => {
        toast.error(action.payload);
        state.status.updateProduct.loading = false;
        state.status.updateProduct.error = action.payload;
      });
  },
});

export const {
  setView,
  updateFilters,
  clearFilters,
  updateSort,
  updatePage,
  clearAllProductStates,
} = productsSlice.actions;
export default productsSlice.reducer;
