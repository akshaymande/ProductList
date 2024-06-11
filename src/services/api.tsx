import axios from "axios";
import { Product } from "../components/types";

const API_URL = "https://dummyjson.com/products";

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get(API_URL);
  return response?.data?.products;
};

export const getSingleProducts = async (
  productID: number
): Promise<Product[]> => {
  const response = await axios.get(API_URL + `/${productID}`);
  return response?.data;
};

export const postProductData = async (product: {}): Promise<Product[]> => {
  const response = await axios.post(
    API_URL + `/add`,
    {
      product,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response?.data;
};

export const updateProduct = async (product: any): Promise<Product[]> => {
  const response = await axios.put(API_URL + `/${product?.id}`, {
    product,
  });
  return response?.data;
};

// export const deleteSingleProducts = async (): Promise<  productID: number> => {
//   const response = await axios.get(API_URL + `/${productID}`);
//   return response?.data?.products;
// };
