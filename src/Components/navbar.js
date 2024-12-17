import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const quantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    setTotalQuantity(quantity);
  }, [cartItems]);

  return (
    <AppBar position="static" sx={{backgroundColor:'black'}}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            E-Commerce App
          </Link>
        </Typography>
        <Link href="/cart" passHref>
          <IconButton color="inherit">
            <Badge badgeContent={totalQuantity} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
