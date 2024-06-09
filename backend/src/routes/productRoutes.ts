import { Router } from "express";
import {
  addProduct,
  getProducts,
  placeOrder,
} from "../controllers/productController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.post("/products", authenticateToken, addProduct);
router.get("/products", authenticateToken, getProducts);
router.post("/placeOrder", authenticateToken, placeOrder);
// router.post("/placeOrder",  placeOrder);

export default router;
