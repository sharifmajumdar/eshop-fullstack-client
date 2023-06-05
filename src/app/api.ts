export interface Product {
    id: string,
    name: string,
    description: string,
    categories: string,
    variants: string,
    quantity: number,
    sizes: string,
    price: number,
    image: string,
    imageAlt: string
  }

import React, { useEffect, useState } from 'react';
import axios from 'axios';
  
  export async function getProducts(): Promise<Product[]> {
    //const results = await fetch("http://localhost:5173/data/products.json");
    const results = await fetch("http://localhost:8080/api/v1/product/");
    const products = await results.json();    
    return products;
  }
  
  export type CartItems = { [productID: string]: number };
  export type CheckoutResponse = { success: boolean; error?: string };
  
  export async function checkout(items: CartItems): Promise<CheckoutResponse> {
    const modifier = Object.keys(items).length > 0 ? "success" : "error";
    const url = `/checkout-${modifier}.json`;
    await sleep(500);
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(items),
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error);
    }
    return data as CheckoutResponse;
  }
  
  // utility function to simulate slowness in an API call
  const sleep = (time: number) =>
    new Promise((res) => setTimeout(res, time));