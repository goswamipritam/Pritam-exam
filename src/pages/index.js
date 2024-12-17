import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, TextField, Button, Slider, MenuItem, Select, FormControl, InputLabel, Typography, Box } from '@mui/material';
import ProductCard from '../Components/ProductCard';
import Navbar from '../Components/navbar';
import Pagination from '@/Components/Pagination';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200]); 
  const [ratingFilter, setRatingFilter] = useState(0);
  const [sort, setSort] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products').then((res) => {
      setProducts(res.data);
      setFilteredProducts(res.data);
    });
  }, []);

  
  const handleSearch = () => {
    let filtered = products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
    
    filtered = filterByPriceAndRating(filtered);
    setFilteredProducts(filtered);
  };

  
  const filterByPriceAndRating = (productsToFilter) => {
    return productsToFilter.filter((product) => 
      product.price >= priceRange[0] && product.price <= priceRange[1] &&
      product.rating.rate >= ratingFilter
    );
  };

  
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  
  const handleRatingChange = (event) => {
    setRatingFilter(event.target.value);
  };

  
  const applyFilters = () => {
    let filtered = filterByPriceAndRating(products);
    setFilteredProducts(filtered);
  };

  
  const handleSort = (criteria) => {
    let sorted = [...filteredProducts];
    if (criteria === 'price') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (criteria === 'name') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }
    setFilteredProducts(sorted);
  };

  
  const paginate = (page) => setCurrentPage(page);

  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div>
      <Navbar />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ p: 2, borderRight: '1px solid #ddd' }}>
              <Typography variant="h6">Search Products</Typography>
              <TextField
                label="Search"
                variant="outlined"
                fullWidth
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch} sx={{ mt: 2, backgroundColor:'black', color:'white' }}>Search</Button>

              <Typography variant="h6" sx={{ mt: 4 }}>Filter by Price</Typography>
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `$${value}`}
                min={0}
                max={200}
                step={5}
                sx={{color:'black'}}
              />

              <Typography variant="h6" sx={{ mt: 4 }}>Filter by Rating</Typography>
              <FormControl fullWidth>
               
                <Select
                  value={ratingFilter}
                  onChange={handleRatingChange}
                >
                  <MenuItem value={0}>All Ratings</MenuItem>
                  <MenuItem value={1}>1 Star</MenuItem>
                  <MenuItem value={2}>2 Stars</MenuItem>
                  <MenuItem value={3}>3 Stars</MenuItem>
                  <MenuItem value={4}>4 Stars</MenuItem>
                  <MenuItem value={5}>5 Stars</MenuItem>
                </Select>
              </FormControl>
              
              <Button onClick={applyFilters} sx={{ mt: 2 ,backgroundColor:'black', color:'white'}}>Apply Filters</Button>

              <Typography variant="h6" sx={{ mt: 4 }}>Sort Products</Typography>
              <Button onClick={() => handleSort('price')} sx={{ mt: 1 ,color :'white', backgroundColor:'black',mr: 1}}>Sort by Price</Button>
              <Button onClick={() => handleSort('name')} sx={{ mt: 1,color :'white', backgroundColor:'black' }}>Sort by Name</Button>
            </Box>
          </Grid>

         
          <Grid item xs={12} sm={8}>
            <Grid container spacing={2}>
              {currentProducts.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>

           
            <Pagination
              productsPerPage={productsPerPage}
              totalProducts={filteredProducts.length}
              paginate={paginate}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
