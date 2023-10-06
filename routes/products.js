import Express from "express";
const router = Express.Router()
import {
    getAllProducts,
    getAllProductsStatic
} from "../controllers/products.js";

router.route('/static').get(getAllProductsStatic)
router.route('/').get(getAllProducts)

export {router}
