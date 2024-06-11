import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  CardMedia,
  Button,
  CircularProgress,
  Grid,
  Box,
  Rating,
} from "@mui/material";
import { Product } from "../types";
import { useProducts } from "../../hooks/UseProductAPI";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  cardImg: {
    border: "1px solid",
  },
});

const ProductDetails: React.FC = () => {
  const classes = useStyles();

  const { id } = useParams<{ id: string }>();
  
  const { fetchSingleProduct, loading, error } = useProducts(id!);
  const [productDetail, setProductDetail] = useState<Product | null>(null);

  useEffect(() => {
    setProductDetail(fetchSingleProduct);
  }, [fetchSingleProduct]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }

  if (!productDetail) {
    return <Typography variant="h6">Product not found</Typography>;
  }
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <CardMedia
            className={classes.cardImg}
            component="img"
            // height="400"
            image={productDetail.images[0]}
            alt={productDetail.title}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography gutterBottom variant="h4">
              {productDetail.title}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {productDetail.brand}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {productDetail.description}
            </Typography>
            <Typography variant="h6" color="text.primary">
              ${productDetail.price}
            </Typography>
            <Rating value={productDetail.rating} readOnly />
            <Typography variant="h6" color="text.secondary">
              {productDetail.reviews.length} reviews
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.history.back()}
            >
              Back
            </Button>
          </Box>
          <Box mt={4}>
            <Typography variant="h5" gutterBottom>
              Customer Reviews
            </Typography>
            {productDetail.reviews.length > 0 &&
              productDetail.reviews.map((review, index) => (
                <Box key={index} mb={2}>
                  <Typography variant="body1" fontWeight="bold">
                    {review.reviewerName}
                  </Typography>
                  <Rating value={review.rating} readOnly />
                  <Typography variant="body2" color="text.secondary">
                    {review.comment}
                  </Typography>
                </Box>
              ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails;
