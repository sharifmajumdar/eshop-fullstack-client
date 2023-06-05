import React, { useState } from 'react';
import axios from 'axios';
import {
    Typography,
    Paper,
    TextField,
    Button,
    Input
  } from '@mui/material';
import Textarea from '@mui/joy/Textarea';

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

const AddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');    
    const [category, setCategory] = useState('');
    const [variant, setVariant] = useState('');
    const [quantity, setQuantity] = useState('');
    const [size, setSize] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [imageAlt, setImageAlt] = useState('');
  
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file){
            const imageData = new FormData();
            imageData.set('key', '2473d8a7f5f5ba28cf6657d5d572953f');
            imageData.append('image', file, file.name);

            axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                setImage(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      const newProduct: Product = {
        name: name,
        description: description,        
        categories: category,
        variants: variant,
        quantity: parseInt(quantity),
        sizes: size,
        price: parseFloat(price),
        image: image,
        imageAlt: imageAlt
      };

      try {
        const response = await axios.post("http://localhost:8080/api/v1/product/", newProduct);
        alert(response.data);
      } catch (error) {
        console.error('Error creating product:', error);
      }
    };
    return (
        <Paper sx={{marginRight: "17px", marginBottom: "17px", padding: "5px"}}>
            <Typography variant='h5'>
                Add a new product
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    size='small'
                    label="Product Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    style={{ width: '50%' }}
                    required
                /> <br /><br />
                <Textarea                    
                    minRows={5}
                    placeholder="Product Description"
                    style={{ width: '50%' }}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    required
                /> <br /><br />
                <TextField
                    label="Category"
                    size='small'
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    fullWidth
                    required
                    style={{ width: '50%' }}
                /> <br /><br />
                <TextField
                    label="Variant"
                    size='small'
                    value={variant}
                    onChange={(event) => setVariant(event.target.value)}
                    fullWidth
                    required
                    style={{ width: '50%' }}
                /> <br /><br />
                <TextField
                    label="Quantity"
                    size='small'
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                    fullWidth
                    required
                    type="number"
                    inputProps={{ min: 0, step: 1 }}
                    style={{ width: '50%' }}
                /> <br /><br />
                <TextField
                    label="Size"
                    size='small'
                    value={size}
                    onChange={(event) => setSize(event.target.value)}
                    fullWidth
                    required
                    style={{ width: '50%' }}
                /> <br /><br />
                <TextField
                    label="Price"
                    size='small'
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    fullWidth
                    required
                    type="number"
                    inputProps={{ min: 0, step: 0.01 }}
                    style={{ width: '50%' }}
                /> <br /><br />
                <Input
                    name='image'
                    type="file"
                    id="imageInput"
                    inputProps={{ accept: 'image/*' }}
                    onChange={handleImageUpload}
                /> <br /><br />
                <TextField
                    label="Image Alt"
                    size='small'
                    value={imageAlt}
                    onChange={(event) => setImageAlt(event.target.value)}
                    fullWidth
                    required
                    style={{ width: '50%' }}
                /> <br /><br />
                <Button variant="contained" color="primary" type="submit">
                    Add Product
                </Button>
            </form>
        </Paper>
    );
};

export default AddProduct;