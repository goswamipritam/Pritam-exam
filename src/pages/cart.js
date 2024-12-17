import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Typography,
  TextField,
  Container,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useRouter } from 'next/router';
import { removeFromCart, updateQuantity, clearCart } from '../redux/slices/cartSlice';
import Navbar from '../Components/navbar';

export default function Cart() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);

  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCart(cartState);
    }
  }, [cartState]);

  const handleRemove = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      dispatch(removeFromCart({ id }));
    }
  };

  const proceedToCheckout = () => {
    router.push('/checkout');
  };

  const handleClearCart = () => {
    setOpenDialog(true);
  };

  const confirmClearCart = () => {
    dispatch(clearCart());
    setOpenDialog(false);
  };

  const cancelClearCart = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Navbar />
      <Container>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Cart
        </Typography>
        {cart.items.length === 0 ? (
          <Typography>Your cart is empty.</Typography>
        ) : (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>
                      <Avatar
                        src={item.image}
                        alt={item.title}
                        sx={{ width: 60, height: 60, borderRadius: '50%' }}
                      />
                    </TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: parseInt(e.target.value, 10),
                            })
                          )
                        }
                        inputProps={{ min: 1 }}
                        sx={{ width: 60 }}
                      />
                    </TableCell>
                    <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                    <TableCell>
                      <Button
                        color="secondary"
                        onClick={() => handleRemove(item.id)} sx={{backgroundColor:'black',color:'white'}}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Total Price: ${cart.totalPrice.toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2, mr: 2, backgroundColor: 'black', color: 'white',mb:2 }}
              onClick={proceedToCheckout}
            >
              Proceed to Checkout
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 2, backgroundColor: 'black', color: 'white',mb:2 }}
              onClick={handleClearCart}
            >
              Clear Cart
            </Button>

           
            <Dialog open={openDialog} onClose={cancelClearCart}>
              <DialogTitle>Clear Cart</DialogTitle>
              <DialogContent>
                <Typography>
                  Are you sure you want to clear your cart? This action cannot be undone.
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={cancelClearCart} sx={{backgroundColor:'black', color:'white'}}>
                  No
                </Button>
                <Button onClick={confirmClearCart} sx={{backgroundColor:'black', color:'white'}}>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </Container>
    </div>
  );
}
