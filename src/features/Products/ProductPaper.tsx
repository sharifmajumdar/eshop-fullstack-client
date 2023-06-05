import {
  Grid,
  Paper,
  Box,
  Typography,
  Rating,
  Button,
  createTheme,
  ThemeProvider
} from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { useState } from 'react'
import { Product } from '../../app/api'
import { useAppDispatch } from '../../app/hooks'
import { addToCart } from '../Cart/cartSlice'

import './ProductPaper.css'

const theme = createTheme({
  components: {
    MuiTypography: {
      variants: [
        {
          props: {
            variant: 'body1'
          },
          style: {
            fontSize: 12
          }
        },
        {
          props: {
            variant: 'body2'
          },
          style: {
            fontSize: 11
          }
        }
      ]
    }
  }
})

const ProductPaper = (props: { product: Product }) => {
  const [value, setValue] = useState<number | null>(2.5)
  const { id, name, price, image, imageAlt } = props.product
  const dispatch = useAppDispatch()

  return (
    <Grid item xs={4} key={id}>
      <ThemeProvider theme={theme}>
        <Paper elevation={3}>
          <img className="img" src={ image } alt={ imageAlt } />
          <Box padding={1}>
            <Typography variant="h6" component="h6">
              { name }
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating
                name="simple-controlled"
                size="small"
                precision={0.5}
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue)
                }}
              />
              <Typography variant="body1" component="p" marginLeft={0.5}>
                {value}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AccessTimeIcon sx={{ width: 12.5 }} />
              <Typography variant="body2" component="p" marginLeft={0.5}>
                5 Hours
              </Typography>
            </Box>
            <Box marginTop={3} sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <Typography variant="h6" component="h3" marginTop={0}>
                €{ price }
              </Typography>
              <Button
                onClick={() => dispatch(addToCart(id))}
                variant="contained"
                sx={{ color: 'white', bgcolor: 'gray' }}>
                Buy Now
              </Button>
            </Box>
          </Box>
        </Paper>
      </ThemeProvider>
    </Grid>
  )
}

export default ProductPaper
