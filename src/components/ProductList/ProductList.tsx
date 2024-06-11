import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  CircularProgress,
  Typography,
  Alert,
  Snackbar,
  Button,
} from "@mui/material";
import { Product } from "../types";
import ProductCard from "../ProductCard/ProductCard";
import { useProducts } from "../../hooks/UseProductAPI";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import DeleteConfirmationDialog from "../Dialog/DeleteConfirmationDialog";
import Fade from "@mui/material/Fade";

const ProductList: React.FC = () => {
  const { allProducts, loading, error } = useProducts(null);
  const [searchText, setSearchText] = useState<string>("");
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(allProducts);

  const navigate = useNavigate();

  useEffect(() => {
    setFilteredProducts(allProducts);
  }, [allProducts]);

  useEffect(() => {
    if (searchText.trim()) {
      setFilteredProducts(
        allProducts.filter((product) =>
          product.title.toLowerCase().includes(searchText.trim().toLowerCase())
        )
      );
    } else {
      setFilteredProducts(allProducts);
    }
  }, [searchText, allProducts]);

  const handleEdit = (product:any) => {
    navigate(`/edit-product/${product.id}`);

    // console.log(`Edit product with id ${product}`,product);
  };

  const handleDetails = (id: number) => {
    navigate(`/products/${id}`);
  };
  const handleNavigate = () => {
    navigate("/add-product");
  };

  const handleSearch = (query: string) => {
    setSearchText(query);
  };
  const handleClear = () => {
    setSearchText("");
    setFilteredProducts(allProducts);
  };

  const handleDelete = (product: any) => {
    setIsDelete(true);
    setOpen(true);
    setSelectedProduct(product);
  };

  const handleClose = () => {
    setIsDelete(false);
    setOpen(false);
    setSelectedProduct(null);
  };

  const handleConfirm = (selectedProduct: any) => {
    setIsDelete(false);
    setOpen(false);
    if (selectedProduct) {
      let allProducts = filteredProducts.filter(
        (product) => product.id !== selectedProduct.id
      );
      setFilteredProducts(allProducts);
      setOpenSnackBar(true);
    }
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }

  return (
    <Container>
      <SearchBar
        searchText={searchText}
        onSearch={handleSearch}
        OnClear={handleClear}
      />
      <Button variant="contained" onClick={handleNavigate}>
        Add Product
      </Button>

      <Grid container spacing={3}>
        {filteredProducts &&
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <ProductCard
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onDetails={handleDetails}
              />
            </Grid>
          ))}
      </Grid>

      {isDelete && (
        <DeleteConfirmationDialog
          open={open}
          handleClose={handleClose}
          handleConfirm={() => handleConfirm(selectedProduct)}
          product={selectedProduct}
        />
      )}

      {openSnackBar && (
        <Snackbar
          open={openSnackBar}
          autoHideDuration={1500}
          TransitionComponent={Fade}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={handleCloseSnackbar}
        >
          <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
            Product deleted successfully!
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default ProductList;
