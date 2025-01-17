import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { blogService } from "./blogService";

// import { toast } from "react-toastify";

// Helper function to extract serializable error message
const extractErrorMessage = (error) => {
  return (
    error.response?.data?.message || error.message || "Something went wrong"
  );
};

export const getAllBlogs = createAsyncThunk(
  "blog/getBlogs",
  async (thunkAPI) => {
    try {
      return await blogService.getBlogs();
    } catch (error) {
      const errorMessage = extractErrorMessage(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getABlog = createAsyncThunk("blog/get", async (id, thunkAPI) => {
  try {
    return await blogService.getABlog(id);
  } catch (error) {
    const errorMessage = extractErrorMessage(error);
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

// export const addToWishList = createAsyncThunk(
//   "product/wishlist",
//   async (productId, thunkAPI) => {
//     try {
//       return await productService.addToWishList(productId);
//     } catch (error) {
//       const errorMessage = extractErrorMessage(error);
//       return thunkAPI.rejectWithValue(errorMessage);
//     }
//   }
// );

const initialState = {
  blogs: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const productSlice = createSlice({
  name: "blogs",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = action.payload;
        state.message = "success";
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload; // Use action.payload which now contains the error message
        state.isLoading = false;
      })
      .addCase(getABlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABlog.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.singleBlog = action.payload;
        state.message = "success";
      })
      .addCase(getABlog.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload; // Use action.payload which now contains the error message
        state.isLoading = false;
      });
    //   .addCase(addToWishList.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(addToWishList.fulfilled, (state, action) => {
    //     state.isError = false;
    //     state.isLoading = false;
    //     state.isSuccess = true;
    //     state.addToWishList = action.payload;
    //     state.message = "Product added to Wishlist";
    //   })
    //   .addCase(addToWishList.rejected, (state, action) => {
    //     state.isError = true;
    //     state.isSuccess = false;
    //     state.message = action.payload; // Use action.payload which now contains the error message
    //     state.isLoading = false;
    //   });
  },
});

export default productSlice.reducer;
