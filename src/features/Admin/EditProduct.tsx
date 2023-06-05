import React, { useState, useEffect } from 'react';
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
    id?: string;
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

const EditProduct = (props: { products: Product[] }) => {
        const [id, setId] = useState(props.products[0].id);  
        const [name, setName] = useState(props.products[0].name);
        const [description, setDescription] = useState(props.products[0].description);    
        const [category, setCategory] = useState(props.products[0].categories);
        const [variant, setVariant] = useState(props.products[0].variants);
        const [quantity, setQuantity] = useState(props.products[0].quantity);
        const [size, setSize] = useState(props.products[0].sizes);
        const [price, setPrice] = useState(props.products[0].price);
        const [image, setImage] = useState(props.products[0].image);
        const [imageAlt, setImageAlt] = useState(props.products[0].imageAlt);

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

    const [editData, setEditData] = useState<Product>({
/*         id: "",
        name: "",
        description: "",
        categories: "",
        variants: "",
        quantity: 0,
        sizes: "",
        price: 0.0,
        image: "",
        imageAlt: "" */
        ...props.products[0]
      });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const updatedProductData: Product = {
            id: id,
          name: name,
          description: description,        
          categories: category,
          variants: variant,
          quantity: quantity,
          sizes: size,
          price: price,
          image: image,
          imageAlt: imageAlt
        };
  
        try {
            const response = await axios.put(`http://localhost:8080/api/v1/product/update/${id}`, updatedProductData);
            console.log('Product updated:', response.data);
            alert("Item updated!");
          } catch (error) {
            console.error('Error updating product:', error);
        }
    };
    return (
        <Paper>
            <Typography>
                Hello from edit product!
            </Typography>
            
                {
                    props.products.map((product) => (
                        <form onSubmit={handleSubmit} key={product.id}>
                            <TextField
                            name='id'
                            size='small'
                            label="Id"
                            value={id}
                            onChange={ (e) => { setId(e.target.value)} }
                            style={{ width: '50%' }}
                            required
                            /> <br /><br />
                            <TextField
                            name='name'
                            size='small'
                            label="Product Name"
                            value={name}
                            onChange={ (e) => { setName(e.target.value)} }
                            style={{ width: '50%' }}
                            required
                            /> <br /><br />
                            <Textarea
                                name='description'                    
                                minRows={5}
                                placeholder="Product Description"
                                style={{ width: '50%' }}
                                value={description}
                                onChange={ (e) => { setDescription(e.target.value)} }
                                required
                            /> <br /><br />
                            <TextField
                                name='categories'
                                label="Category"
                                size='small'
                                value={category}
                                onChange={(e) => { setCategory(e.target.value)}}
                                fullWidth
                                required
                                style={{ width: '50%' }}
                            /> <br /><br />
                            <TextField
                                name='variants'
                                label="Variant"
                                size='small'
                                value={variant}
                                onChange={(e) => { setVariant(e.target.value)}}
                                fullWidth
                                required
                                style={{ width: '50%' }}
                            /> <br /><br />
                            <TextField
                                name='quantity'
                                label="Quantity"
                                size='small'
                                value={quantity}
                                onChange={(e) => { setQuantity(parseInt(e.target.value))}}
                                fullWidth
                                required
                                type="number"
                                inputProps={{ min: 0, step: 1 }}
                                style={{ width: '50%' }}
                            /> <br /><br />
                            <TextField
                                name='sizes'
                                label="Size"
                                size='small'
                                value={size}
                                onChange={(e) => { setSize(e.target.value)}}
                                fullWidth
                                required
                                style={{ width: '50%' }}
                            /> <br /><br />
                            <TextField
                                name='price'    
                                label="Price"
                                size='small'
                                value={price}
                                onChange={(e) => { setPrice(parseFloat(e.target.value))}}
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
                                name='imageAlt'
                                label="Image Alt"
                                size='small'
                                value={imageAlt}
                                onChange={(e) => { setImageAlt(e.target.value)}}
                                fullWidth
                                required
                                style={{ width: '50%' }}
                            /> <br /><br />
                            <Button variant="contained" color="primary" type="submit">
                                Update Product
                            </Button>
                        </form>
                    ))
                }                
        </Paper>
    );
};

export default EditProduct;