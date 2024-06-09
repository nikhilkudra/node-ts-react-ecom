import sequelize from "../config/database";
import {
    initializeOrderChairs,
} from "../models/";
import {
  OrderChairsRecord,
} from "../utils/interfaces";

export const placeOrderChairService = async (data:OrderChairsRecord) => {
  try {
     return await initializeOrderChairs(sequelize).create({
      ...data,
    });
  } catch (error) {
    const err = error as Error; 
    return err;
  }
};