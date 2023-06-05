import { useState, useEffect } from 'react'
import axios from 'axios';
import { getProducts } from '../../app/api'
import { receivedProducts } from '../Products/productsSlice'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { useLocation, useNavigate, Link  } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  TableFooter,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar
} from '@mui/material'
import EditProduct from './EditProduct';

interface Product {
  name?: string;
  description?: string;
  categories?: string;
  variants?: string;
  quantity?: number;
  sizes?: string;
  price?: number;
  image?: string;
  imageAlt?: string;
}

const ManageProduct = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const products = useAppSelector((state) => state.products.products)
  const [filteredProduct, setFilteredProduct] = useState(Object.values(products));

  useEffect(() => {
    getProducts().then((products) => {
      dispatch(receivedProducts(products))
    })
  }, [])

  const handleRemoveProduct = async (productId: string) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/v1/product/id/${productId}`);
        alert(response.data);
        navigate('/admin');
      } catch (error) {
        console.error('Error creating product:', error);
      }
  }

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [singleProductId, setSingleProductId] = useState<string>("");

  const handleEditProduct = async (productId: string) => {
        setIsEdit(true);
        setSingleProductId(productId);
        const filteredProduct = Object.values(products).filter( (product) => {
          return product.id == productId;
      });
        setFilteredProduct(filteredProduct);
  }

  return (
    <Paper sx={{ marginRight: '17px', marginBottom: '17px', padding: '5px' }}>
      <Box sx={{ margin: 0 }}>
        {isEdit ?            
            <EditProduct products = { filteredProduct } /> :
        products && (
          <Box>
            <Typography variant="h3">Product List</Typography> <hr />
            <br />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="shopping cart table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Image</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Product</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.values(products).map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Avatar
                          sx={{ minWidth: 100, minHeight: 100 }}
                          src={product.image}
                          alt={product.imageAlt}
                        />
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>€{product.price}</TableCell>
                      <TableCell>
                        <Button
                          //onClick={() => dispatch(updateProduct(id))}
                          onClick={ () => handleEditProduct(product.id) }
                          aria-label={`Edit ${product.name} from list`}>
                          Edit Item
                        </Button>
                        <Button
                          //onClick={() => dispatch(removeProduct(id))}
                          onClick={() => handleRemoveProduct(product.id)}
                          aria-label={`Remove ${product.name} from list`}>
                          Remove Item
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
{/*                 <TableFooter>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }} colSpan={4} align="right">
                      <Button onClick={handleCheckout}>Add a new product</Button>
                    </TableCell>
                  </TableRow>
                </TableFooter> */}
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>
    </Paper>
  )
}

export default ManageProduct
