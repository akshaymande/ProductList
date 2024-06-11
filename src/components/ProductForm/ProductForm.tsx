import React, { useCallback, useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  MenuItem,
  CircularProgress,
  Snackbar,
  Fade,
  Alert,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../../hooks/UseProductAPI";

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  stock: number;
  brand: string;
}

const categories = [
  { value: "beauty", label: "Beauty" },
  { value: "electronics", label: "Electronics" },
  { value: "fashion", label: "Fashion" },
  { value: "home", label: "Home" },
  { value: "fragrances", label: "Fragrances" },
  { value: "furniture", label: "Furniture" },
  { value: "groceries", label: "Groceries" },
  
  
];

interface ProductFormProps {
  mode: "add" | "edit";
}

const ProductForm: React.FC<ProductFormProps> = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<any>({
    id: 0,
    title: "",
    description: "",
    category: "beauty",
    price: 0,
    discountPercentage: 0,
    stock: 0,
    brand: "",
  });
  const [isValid, setIsValid] = useState<boolean>(false);
  const { addProduct, fetchProductByID, editProduct, loading, error } = useProducts();
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const checkValidity = useCallback((product: Product) => {
    return !!product.title && !!product.description && !!product.brand;
  }, []);

  useEffect(() => {
    if (mode === "edit" && id) {
      const fetchProduct = async () => {
        const productData = await fetchProductByID(Number(id));
        setProduct(productData);
      };

      fetchProduct();
    }
  }, [mode]);

    useEffect(() => {
        console.log(product,"product")
        setIsValid(checkValidity(product));
      }, [product]);
    

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setProduct((prevProduct:any) => ({
        ...prevProduct,
        [name]: value,
    }));
}, []);



  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "add") {
      const addProductResponse = await addProduct(product);
      if (addProductResponse) {
        setOpenSnackBar(true);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } else {
      const updateProductResponse = await editProduct(product.id, product);
      if (updateProductResponse) {
        setOpenSnackBar(true);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    }
  }, [mode, product, addProduct, editProduct, navigate]);

  
  const handleCloseSnackbar = useCallback((event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  }, []);

  
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        {mode === "add" ? "Add Product" : "Edit Product"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={product.title}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              required
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Category"
              name="category" 
              value={product.category}
              onChange={handleInputChange}
              required
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={product.price}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Discount Percentage"
              name="discountPercentage"
              type="number"
              value={product.discountPercentage}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Stock"
              name="stock"
              type="number"
              value={product.stock}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Brand"
              name="brand"
              value={product.brand}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!isValid}
            >
              {mode === "add" ? "Add Product" : "Update Product"}
            </Button>
          </Grid>
        </Grid>
      </form>
      {openSnackBar && (
        <Snackbar
          open={openSnackBar}
          autoHideDuration={1500}
          TransitionComponent={Fade}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={handleCloseSnackbar}
        >
          <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
            {mode === "add"
              ? "Product Added Successfully!"
              : "Product Updated Successfully!"}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default ProductForm;
