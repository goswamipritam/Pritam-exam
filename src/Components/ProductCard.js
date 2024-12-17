import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success('Product added to cart successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <Card sx={{mt:2}}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.title}
      />
      <CardContent>
        <Typography variant="h6" noWrap>
          {product.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          ${product.price}
        </Typography>
        <Link href={`/products/${product.id}`} passHref>
          <Button variant="outlined" sx={{ mt: 2 ,backgroundColor:'black', color:'white'}}>
            View Details
          </Button>
        </Link>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, backgroundColor:'black', color:'white' }}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </CardContent>
      <ToastContainer />
    </Card>
  );
}
