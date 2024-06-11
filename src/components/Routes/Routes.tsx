import React from "react";
import { useRoutes } from "react-router-dom";
import ProductDetails from "../ProductDetail/ProductDetails";
import ProductForm from "../ProductForm/ProductForm";
import ProductList from "../ProductList/ProductList";

const Routes: React.FC = () => {
  return useRoutes([
    { path: "/", element: <ProductList /> },
    { path: "/products/:id", element: <ProductDetails /> },
    { path: "/add-product", element: <ProductForm mode="add"/> },
    { path: "/edit-product/:id", element: <ProductForm mode="edit"/> },
  ]);
};

export default Routes;
