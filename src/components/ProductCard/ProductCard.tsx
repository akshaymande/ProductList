import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import { Product } from "../types";
import { makeStyles } from "@mui/styles";

interface ProductCardProps {
  product: Product;
  onEdit: (product: any) => void;
  onDelete: (product:any) => void;
  onDetails: (id: number) => void;
}

const useStyles = makeStyles({
  card: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    "&:hover": {
      boxShadow: "0 8px 16px rgba(0, 0, 0, 1)",
    },
  },
  media: {
    height: 140,
  },
  content: {
    flexGrow: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    // WebkitLineClamp: 5,
  },
});

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
  onDetails,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        component="img"
        image={product.images[0]}
        alt={product.title}
      />
      <CardContent className={classes.content}>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onEdit(product)}>
          Edit
        </Button>
        <Button size="small" onClick={() => onDetails(product.id)}>
          Details
        </Button>
        <Button
          size="small"
          color="secondary"
          onClick={() => onDelete(product)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
