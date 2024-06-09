import { Request, Response } from "express";
import sequelize from "../config/database";
import {
  initializeOrderTops,
} from "../models/";
import {
  OrderTopsRecord,
} from "../utils/interfaces";

export const placeOrderTopService = async (data:OrderTopsRecord) => {
  try {
   return await initializeOrderTops(sequelize).create({
      ...data,
    });
  } catch (error) {
    const err = error as Error; 
    return err;
  }
};