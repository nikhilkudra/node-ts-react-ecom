import { Request, Response } from 'express';
import { Product } from '../models';
import {placeOrderService} from '../services/orderService'

export const addProduct = async (req: Request, res: Response) => {
  const { name, price, category, imageUrl } = req.body;
  try {
    const newProduct = await Product.create({ name, price, category, imageUrl });
    res.status(201).json(newProduct);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
};

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    const err = error as Error; 
    res.status(500).json({ error: err.message });
  }
};
export const placeOrder = async (_req: Request, res: Response) => {
  try {
    const products = await placeOrderService(_req)
    res.json(products);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
};
