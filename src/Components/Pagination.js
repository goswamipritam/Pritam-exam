import { Button, ButtonGroup } from '@mui/material';

export default function Pagination({ productsPerPage, totalProducts, paginate }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ButtonGroup sx={{ mt: 2 ,mb: 2}}>
      {pageNumbers.map((number) => (
        <Button key={number} onClick={() => paginate(number)} sx={{backgroundColor:'black', color:'white'}}>
          {number}
        </Button>
      ))}
    </ButtonGroup>
  );
}
