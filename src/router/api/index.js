import {Router} from "express"
import products_router from './products.ruote'
import cart_router from './carts.route'

const api_router = Router()

api_router.get('/products',products_router)
api_router.get('/carts',cart_router)

export default api_router
//API