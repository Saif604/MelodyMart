import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createReviewThunk,
  getAllProductsThunk,
  getSingleProductReviewsThunk,
  getSingleProductThunk,
} from "./productsThunk";
import { toast } from "react-toastify";

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  getAllProductsThunk
);
export const getSingleProductReviews = createAsyncThunk(
  "products/getSingleProductReviews",
  getSingleProductReviewsThunk
);
export const createReview = createAsyncThunk(
  "products/createReview",
  createReviewThunk
);
export const getSingleProduct = createAsyncThunk(
  "products/getSingleProduct",
  getSingleProductThunk
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
  allProductsLoading: false,
  allProductsError: false,
  singleProductLoading: true,
  singleProductError: false,
  singleProductReviews: [],
  singleProduct: null,
  singleProductTotalReviews: 0,
  allProducts: [],
  allProductsCount: 0,
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
        state.allProductsLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        const { products, nbhits, pages, featured, allProducts } =
          action.payload;
        state.allProductsLoading = false;
        state.products = [...products];
        state.totalProducts = nbhits;
        state.pages = pages;
        state.featuredProducts = featured;

        state.filterLayout.categories = [
          "all",
          ...new Set(allProducts.map((product) => product.category)),
        ].map((item, index) => {
          if (item === "all") return { name: "All", value: "" };
          return {
            name: item.slice(0, 1).toUpperCase() + item.slice(1),
            value: item,
          };
        });

        state.filterLayout.companies = ["all",
          ...new Set(allProducts.map((product) => product.company)),
        ].map((item,index)=>{
          if(item === "all") return {name:"All",value:""}
          return {name:item.slice(0,1).toUpperCase() + item.slice(1),value:item}
        });

        state.filterLayout.colors = allProducts.reduce((acc, product) => {
          product.colors.forEach((color) => {
            if (!acc.includes(color)) {
              acc.push(color);
            }
          });
          return acc;
        }, []);

        state.filterLayout.prices = allProducts.reduce(
          (acc, product) => {
            if (product.price < acc.minPrice) acc.minPrice = product.price;
            if (product.price > acc.maxPrice) acc.maxPrice = product.price;
            return acc;
          },
          { minPrice: Infinity, maxPrice: -Infinity }
        );
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.allProductsLoading = false;
        state.allProductsError = action.payload;
        toast.error(action.payload);
      })
      .addCase(getSingleProduct.pending, (state) => {
        state.singleProductLoading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.singleProduct = { ...action.payload };
        state.singleProductLoading = false;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.singleProductLoading = false;
        state.singleProductError = true;
        toast.error(action.payload);
      })
      .addCase(getSingleProductReviews.pending, (state) => {
        state.singleProductLoading = true;
      })
      .addCase(getSingleProductReviews.fulfilled, (state, action) => {
        const { count: totalReviews, reviews } = action.payload;
        state.singleProductReviews = [...reviews];
        state.singleProductTotalReviews = totalReviews;
        state.singleProductLoading = false;
      })
      .addCase(getSingleProductReviews.rejected, (state, action) => {
        state.singleProductLoading = false;
        toast.error(action.payload);
      })
      .addCase(createReview.fulfilled, (_, action) => {
        toast.success("Review added successfully...");
      })
      .addCase(createReview.rejected, (_, action) => {
        toast.error(action.payload);
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
