import { useState, useEffect, useCallback } from "react";
import { Product } from "../components/types";
import {
  getProducts,
  getSingleProducts,
  postProductData,
  updateProduct,
} from "../services/api";

export const useProducts = (productID?: any) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [fetchSingleProduct, setFetchSingleProduct] = useState<any>();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean | null>(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    productID && fetchProductByID(productID);
  }, [productID]);

  const fetchProducts = async () => {
    try {
      const allProducts = await getProducts();
      setAllProducts(allProducts);
    } catch (error) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const fetchProductByID = async (productID: number) => {
    try {
      const productDetials = await getSingleProducts(productID);
      setFetchSingleProduct(productDetials);
    return productDetials;
    } catch (error) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };
  const addProduct = async (product: any) => {
    try {
      const addProductResponce = await postProductData(product);
      return addProductResponce;
    } catch (error) {
      setError("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  const editProduct = async (id: number, product: Product) => {
    setLoading(true);
    setError(null);

    try {
      const editProductResponce = await updateProduct(product);
      return editProductResponce;
    } catch (error) {
      setError("Failed to edit product");
    } finally {
      setLoading(false);
    }
  };

  return {
    allProducts,
    fetchProductByID,
    addProduct,
    editProduct,
    loading,
    error,
    fetchSingleProduct,
  };
};
