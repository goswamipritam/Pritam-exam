import React from 'react';
import { Container, Grid, Typography, Link, IconButton, Box } from '@mui/material';
import { Facebook, Twitter, Instagram, YouTube } from '@mui/icons-material';

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: '#222', color: '#fff', padding: '20px 0' }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Company
            </Typography>
            <Link href="#" color="inherit" display="block">
              About Us
            </Link>
            <Link href="#" color="inherit" display="block">
              Careers
            </Link>
            <Link href="#" color="inherit" display="block">
              Privacy Policy
            </Link>
            <Link href="#" color="inherit" display="block">
              Terms of Service
            </Link>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Customer Service
            </Typography>
            <Link href="#" color="inherit" display="block">
              Help Center
            </Link>
            <Link href="#" color="inherit" display="block">
              Shipping & Returns
            </Link>
            <Link href="#" color="inherit" display="block">
              FAQs
            </Link>
            <Link href="#" color="inherit" display="block">
              Track Your Order
            </Link>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <IconButton color="inherit" href="https://www.facebook.com" target="_blank">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" href="https://twitter.com" target="_blank">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" href="https://www.instagram.com" target="_blank">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" href="https://www.youtube.com" target="_blank">
                <YouTube />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

       
          
        
      </Container>
    </Box>
  );
}
