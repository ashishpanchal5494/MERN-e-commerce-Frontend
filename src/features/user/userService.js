import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";
const register = async (userData) => {
  const response = await axios.post(`${base_url}user/register`, userData);
  if (response.data) {
    if (response.data) {
      return response.data;
    }
  }
};
const login = async (userData) => {
  const response = await axios.post(`${base_url}user/login`, userData);
  if (response.data) {
    localStorage.setItem("customer", JSON.stringify(response.data));
    return response.data;
  }
};
const getUserWislist = async () => {
  const response = await axios.get(`${base_url}user/wishlist`, config);
  if (response.data) {
    return response.data;
  }
};
const addToCart = async (cartData) => {
  const response = await axios.post(`${base_url}user/cart`, cartData, config);
  if (response.data) {
    return response.data;
  }
};
const getCart = async () => {
  const response = await axios.get(`${base_url}user/cart`, config);
  if (response.data) {
    return response.data;
  }
};
const removeProductFromCart = async (cartItemId) => {
  const response = await axios.delete(
    `${base_url}user/delete-product-cart/${cartItemId}`,
    config
  );
  if (response.data) {
    return response.data;
  }
};
const updateProductFromCart = async (cartDetail) => {
  console.log(cartDetail);
  const response = await axios.delete(
    `${base_url}user/update-product-cart/${cartDetail.cartItemId}/${cartDetail.quantity}`,
    config
  );
  if (response.data) {
    return response.data;
  }
};

const createOrder = async (orderDetail) => {
  try {
    const response = await axios.post(
      `${base_url}user/cart/create-order`,
      orderDetail,
      config
    );

    // Return response data if the request is successful
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);

    // Handle specific error responses
    if (error.response) {
      // Server responded with a status outside the 2xx range
      throw new Error(error.response.data.message || "Failed to create order");
    } else if (error.request) {
      // Request was sent but no response was received
      throw new Error("No response received from the server");
    } else {
      // Something else caused the error
      throw new Error("An error occurred while creating the order");
    }
  }
};

const getUserOrders = async () => {
  const response = await axios.get(`${base_url}user/getmyorders`, config);
  if (response.data) {
    return response.data;
  }
};

const emptyCart = async () => {
  const response = await axios.delete(`${base_url}user/empty-cart`, config); // Change GET to DELETE
  if (response.data) {
    return response.data;
  }
};

const updateUser = async (data) => {
  const response = await axios.put(`${base_url}user/edit-user`, data, config);
  if (response.data) {
    return response.data;
  }
};

const forgotPassToken = async (data) => {
  const response = await axios.post(
    `${base_url}user/forgot-password-token`,
    data
  );
  if (response.data) {
    return response.data;
  }
};

const resetPass = async (data) => {
  const response = await axios.put(
    `${base_url}user/reset-password/${data.token}`,
    { password: data?.password }
  );
  if (response.data) {
    return response.data;
  }
};

export const authService = {
  register,
  login,
  getUserWislist,
  addToCart,
  getCart,
  emptyCart,
  removeProductFromCart,
  updateProductFromCart,
  createOrder,
  getUserOrders,
  updateUser,
  forgotPassToken,
  resetPass,
};
