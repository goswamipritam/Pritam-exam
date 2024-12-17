import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import Navbar from '../../Components/navbar';
import Image from 'next/image';

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query; 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      axios
        .get(`https://fakestoreapi.com/products/${id}`)
        .then((response) => {
          setProduct(response.data);
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to fetch product details. Please try again.');
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading product details...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => router.push('/')}
        >
          Go Back to Home
        </Button>
      </Container>
    );
  }

  return (
    <div>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Image
          src={product.image}
          alt={product.title}
          width={400} 
          height={400} 
          style={{ margin: '0 auto', display: 'block' }}
        />
        <Typography variant="h4" sx={{ mt: 3 }}>
          {product.title}
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
          ${product.price.toFixed(2)}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {product.description}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 , backgroundColor:'black', color:'white', mb:2}}
          onClick={() => dispatch(addToCart(product))}
        >
          Add to Cart
        </Button>
        <Button
          variant="outlined"
          sx={{ mt: 3, ml: 2 , backgroundColor:'black', color:'white',mb: 2 }}
          onClick={() => router.push('/')}
        >
          Back to Home
        </Button>
      </Container>
    </div>
  );
}
