import { Request, Response } from "express";
import sequelize from "../config/database";
import {
    initializeOrderTables,
} from "../models/";
import {
  OrderTablesRecord,
} from "../utils/interfaces";

export const placeOrderTablesService = async (data:OrderTablesRecord) => {
  try {
  return await initializeOrderTables(sequelize).create({
      ...data,
    });
     ;
  } catch (error) {
    const err = error as Error; 
    return err;
  }
};