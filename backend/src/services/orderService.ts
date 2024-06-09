import { Request, Response } from "express";
import sequelize from "../config/database";
import { placeOrderTopService } from "./orderTopsService";
import { placeOrderTablesService } from "./orderTablesService";
import { placeOrderChairService } from "./orderChairsService";
import { initializeOrder } from "../models/";
import {
  OrderItem,
  OrderChairsRecord,
  OrderTablesRecord,
  OrderTopsRecord,
  createOrderRecord,
} from "../utils/interfaces";

export const placeOrderService = async (req: Request) => {
  try {
    const data = req.body;
    const totalAmount: number = data?.orders.reduce(
      (acc: number, order: any) => acc + parseFloat(order.price),
      0
    );
    const orderRecords: createOrderRecord = {
      amount: totalAmount,
      user_id: data?.users.id,
      name: data?.details.name,
      phone: data?.details.phone,
      address: data?.details.address,
      pincode: data?.details.pincode,
    };
    const newOrder = await initializeOrder(sequelize).create({
      ...orderRecords,
    });
    const newOrderDetails: any = await processOrders(data?.orders, newOrder.id);
    return newOrderDetails;
  } catch (error) {
    const err = error as Error;
    return err;
  }
};

const processOrders = async (orders: OrderItem[], orderId: number) => {
  try {
    let num = 1;
    orders.forEach(async (order) => {
      if (order.category === "Chairs") {
        const orderChairRecord: OrderChairsRecord = {
          order_id: orderId,
          chair_id: order.id,
          quantity: num || 1,
        };
        await placeOrderChairService(orderChairRecord);
      } else if (order.category === "Table") {
        const orderTableRecord: OrderTablesRecord = {
          order_id: orderId,
          table_id: order.id,
          quantity: num || 1,
        };
        await placeOrderTablesService(orderTableRecord);
      } else if (order.category === "Top") {
        const orderTopRecord: OrderTopsRecord = {
          order_id: orderId,
          top_id: order.id,
          quantity: num || 1,
        };
        await placeOrderTopService(orderTopRecord);
      }
    });
   return
  } catch (error) {
    const err = error as Error;
    return err;
  }
};
