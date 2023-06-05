import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { getTotalPrice, removeFromCart, updateQuantity } from './cartSlice'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
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

const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const products = useAppSelector((state) => state.products.products)
  const items = useAppSelector((state) => state.cart.items)
  const totalPrice = useAppSelector(getTotalPrice)

  function onQuantityChanged(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, id: string) {
    const quantity = Number(e.target.value) || 0
    dispatch(updateQuantity({ id, quantity }))
  }

  const handleCheckout = () => {
    navigate('/checkout')
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 15 }}>
      <Box sx={{ margin: 0 }}>
        <Typography variant="h3">Shopping Cart</Typography> <hr />
        <br />
        {Object.keys(items).length > 0 ? (
          <Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="shopping cart table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Image</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Product</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Quantity</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(items).map(([id, quantity]) => (
                    <TableRow key={id}>
                      <TableCell>
                        <Avatar  sx={{ minWidth: 100, minHeight: 100}} src={products[id].image} alt={products[id].imageAlt} />
                      </TableCell>
                      <TableCell>{products[id].name}</TableCell>
                      <TableCell>
                      <TextField
                        size='small'                        
                        type="number"
                        inputProps={{ min: 1 }}
                        value={quantity}
                        onChange={(e) => onQuantityChanged(e, id)}
                        />                        
                      </TableCell>
                      <TableCell>€{products[id].price}</TableCell>
                      <TableCell>€{products[id].price * quantity}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => dispatch(removeFromCart(id))}
                          aria-label={`Remove ${products[id].name} from shopping cart`}>
                          Remove Item
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }} colSpan={4} align="right">
                      Total Cost:
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>€{totalPrice}</TableCell>
                    <TableCell>
                      <Button onClick={handleCheckout}>Checkout</Button>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
            <Box display="flex" justifyContent="right">
              <Link to="/"><Button>Continue Shopping</Button></Link>
            </Box>
          </Box>
        ) : (
          <Box display="flex" justifyContent="center"  alignItems="center">
            <img
              src="https://i.ibb.co/N9RRSHB/6a0fa7f46ba72d002786d0579f8de1d0.jpg"
              alt="emptybag/img"
            />
          </Box>
        )}
      </Box>
    </Container>
  )
}

export default Cart
