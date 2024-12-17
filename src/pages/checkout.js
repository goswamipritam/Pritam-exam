"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Container,
  Avatar,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useRouter } from "next/navigation"; 
import Navbar from "../Components/navbar";
import { clearCart } from "../redux/slices/cartSlice";  

export default function Checkout() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const cart = useSelector((state) => state.cart);

  const [checkoutData, setCheckoutData] = useState({
    subtotal: 0,
    tax: 0,
    deliveryCharges: 0,
    discount: 0,
    totalPayable: 0,
  });

  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const subtotal = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const tax = (subtotal * 5) / 100;
    const deliveryCharges = subtotal > 100 ? 0 : 20; 
    const discount = subtotal > 200 ? 30 : 0;
    const totalPayable = subtotal + tax + deliveryCharges - discount;

    setCheckoutData({
      subtotal,
      tax,
      deliveryCharges,
      discount,
      totalPayable,
    });
  }, [cart]);

  if (!isClient) {
    return null;
  }

  const handleOrderNow = () => {

    if (!address || !cardNumber || !cvv || !expiry) {
      alert("Please fill in all the required fields");
      return;
    }

    console.log("Order Placed:", {
      address,
      cardDetails: { cardNumber, expiry, cvv },
      orderDetails: checkoutData,
    });

    
    setShowToast(true);

    dispatch(clearCart());

    
    setTimeout(() => {
      router.push("/"); 
    }, 2000);
  };

  return (
    <div>
      <Navbar />
      <Container>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Checkout Summary
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
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
                    sx={{ width: 60, height: 60 }}
                  />
                </TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  ${(item.price * item.quantity).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Subtotal: ${checkoutData.subtotal.toFixed(2)}
        </Typography>
        <Typography variant="h6">Tax (5%): ${checkoutData.tax.toFixed(2)}</Typography>
        <Typography variant="h6">
          Delivery Charges: ${checkoutData.deliveryCharges.toFixed(2)}
        </Typography>
        <Typography variant="h6">Discount: -${checkoutData.discount.toFixed(2)}</Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>
          Total Payable: ${checkoutData.totalPayable.toFixed(2)}
        </Typography>

        <Typography variant="h6" sx={{ mt: 4 }}>
          Shipping Address
        </Typography>
        <TextField
          fullWidth
          label="Enter your address"
          variant="outlined"
          sx={{ mt: 2 }}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <Typography variant="h6" sx={{ mt: 4 }}>
          Payment Details
        </Typography>
        <TextField
          fullWidth
          label="Card Number"
          variant="outlined"
          sx={{ mt: 2 }}
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <TextField
          fullWidth
          label="Expiry Date (MM/YY)"
          variant="outlined"
          sx={{ mt: 2 }}
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
        />
        <TextField
          fullWidth
          label="CVV"
          variant="outlined"
          sx={{ mt: 2 }}
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 4, backgroundColor: 'black', color: 'white', mb: 2 }}
          onClick={handleOrderNow}
        >
          Order Now
        </Button>

        <Snackbar
          open={showToast}
          autoHideDuration={2000}
          onClose={() => setShowToast(false)}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            Order placed successfully!
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
}
