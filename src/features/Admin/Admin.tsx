import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { getProducts, Product } from '../../app/api'
import { receivedProducts } from '../Products/productsSlice';
import { addProductThunk } from './adminSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Grid,
    Paper,
    Button,
    Link
  } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { green } from '@mui/material/colors';
import ManageProduct from './ManageProduct';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import DeleteProduct from './DeleteProduct';

const Admin = () => {
    const dispatch = useAppDispatch()
    const [ newProduct, setNewProduct ] = useState<Partial<Product>>();
    const navigate = useNavigate();

    useEffect(() => {
      getProducts().then((products) => {
        dispatch(receivedProducts(products))
      })
    }, [])
  
    const products = useAppSelector((state) => state.products.products)


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const product = {
            "id": "1009",
            "name": "Oil: Parachute Coconut Oil",
            "description": "lorem sitsum",
            "categories": "Cosmetics",
            "variants": "Mini Pack",
            "quantity": 25,
            "sizes": "200ml",
            "price": 10.75,
            "image": "https://i.ibb.co/YPTPY0q/image9.png",
            "imageAlt": "Parachute keeps head cool",
            ...newProduct
        }
        dispatch(addProductThunk(product));
        alert("Product added")
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        console.log(value)
        setNewProduct( (prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const [isAdminPage, setIsAdminPage] = useState<boolean>(true);
    const [isManageProduct, setIsManageProduct] = useState<boolean>(false);
    const [isAddProduct, setIsAddProduct] = useState<boolean>(false);
    const [isEditProduct, setIsEditProduct] = useState<boolean>(false);
    const [isDeleteProduct, setIsDeleteProduct] = useState<boolean>(false);

    // Admin home page
    const handleAdminPage = () => {
        setIsAdminPage(true);
        setIsManageProduct(false);
        setIsAddProduct(false);
        setIsEditProduct(false);
        setIsDeleteProduct(false);
    }
    //Manage product
    const handleManageProduct = () => {
        setIsAdminPage(false);
        setIsManageProduct(true);
        setIsAddProduct(false);
        setIsEditProduct(false);
        setIsDeleteProduct(false);
    }

    // Add a product
    const handleAddProduct = () => {
        setIsAdminPage(false);
        setIsManageProduct(false);
        setIsAddProduct(true);
        setIsEditProduct(false);
        setIsDeleteProduct(false);
    }

    // Edit product
    const handleEditProduct = () => {
        setIsAdminPage(false);
        setIsManageProduct(false);
        setIsAddProduct(false);
        setIsEditProduct(true);
        setIsDeleteProduct(false);
    }

    // Delete product
    const handleDeleteProduct = () => {
        setIsAdminPage(false);
        setIsManageProduct(false);
        setIsAddProduct(false);
        setIsEditProduct(false);
        setIsDeleteProduct(true);
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 15 }}>
            <Grid container spacing={2}>
                <Grid item sx={{backgroundColor: "success.dark"}} xs={12} sm={6} md={2} justifyContent="center" alignItems="center">
                    <Typography color="white" variant="h1">
                        <Button size="large" variant='text' color='inherit' startIcon={<AdminPanelSettingsIcon />} onClick={() => handleAdminPage()}>eSHOP</Button>
                    </Typography> <br /><br />
                    <Typography color="white" variant="h4">
                        <Button variant='text' color="inherit" startIcon={<DashboardIcon />} onClick={() => handleManageProduct()}>Product</Button>
                    </Typography><br />
                    <Typography color="white" variant="h4">
                        <Button variant='text' color='inherit' startIcon={<AddCircleOutlineIcon />} onClick={() => handleAddProduct()}>Add Product</Button>
                    </Typography><br />
{/*                     <Typography color="white" variant="h4">
                        <Button variant='text' color='inherit' startIcon={<ModeEditIcon />}  onClick={() => handleEditProduct()}>Edit Product</Button>
                    </Typography><br />
                    <Typography color="white" variant="h4">
                        <Button variant='text' color='inherit' startIcon={<DeleteIcon />} onClick={() => handleDeleteProduct()}>Delete Product</Button>
                    </Typography><br /> */}
                </Grid>
                <Grid item sx={{backgroundColor: green[50]}} xs={12} sm={6} md={10}>
                    {
                        isAdminPage && 
                        <Paper sx={{marginRight: "17px", padding: "5px"}}>
                            <Typography variant="h3">Welcome to Admin Panel!</Typography> <hr />
                            <Typography variant="body1" color="textPrimary" align="left" paragraph>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur maxime rem perspiciatis perferendis, soluta animi dolores voluptas repudiandae labore. Magni vel, fugiat debitis eius quibusdam dolorem non accusamus in! Magni!
                            </Typography>
                        </Paper>
                    }
                    {
                        isManageProduct &&
                        <ManageProduct />
                    }
                    {
                        isAddProduct && 
                        <AddProduct />
                    }
{/*                     {
                        isEditProduct && 
                        <EditProduct />
                    }
                    {
                        isDeleteProduct && 
                        <DeleteProduct />
                    } */}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Admin;