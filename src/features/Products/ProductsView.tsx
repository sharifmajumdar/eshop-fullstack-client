import { Container, Grid } from '@mui/material'
import { useState, useEffect } from 'react'

import { getProducts } from '../../app/api'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { receivedProducts } from './productsSlice'
import Search from '../Search/Search'

import ProductPaper from './ProductPaper'

const ProductsView = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);

  useEffect(() => {
    getProducts().then((products) => {
      dispatch(receivedProducts(products))
    })
  }, []);

  const [filteredProduct, setFilteredProduct] = useState(Object.values(products));

  const onSearch = (searchValue: string) => {
      let inputValue = searchValue.toLowerCase();       
      const newProducts = Object.values(products).filter( (product) => {
          const productName = product.name.toLowerCase();
          return productName.startsWith(inputValue);
      });
      setFilteredProduct(newProducts);
  }

  return (
    <Container>
        <Grid container spacing={5} justifyContent = "center" sx={{ marginTop: "25px"}}>
          <Search onSearch = { onSearch } />
          {
                filteredProduct.length ? 
                filteredProduct.map((product) => (
                    <ProductPaper key={product.id} product={product} />
                )) :
                Object.values(products).map((product) => (
                    <ProductPaper key={product.id} product={product} />
                ))
          }
        </Grid>
    </Container>
  )
}

export default ProductsView
