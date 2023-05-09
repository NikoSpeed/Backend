import express from 'express'
import productsRouter from './routes/products.ruote.js'
import cartsRouter from './routes/carts.route.js'
import products from './products.js'
import carts from './carts.js'

let server = express()

let PORT = 8080
let ready = ()=>console.log('server ready on port: '+PORT)

server.listen(PORT,ready)
server.use(express.json())
server.use(express.urlencoded({extended:true}))

let one_route = '/api/products/:pid'
let one_function = (request,response) =>{
    let parameter = request.params
    let id = Number(parameter.id)
    let one = products.getProductsById(id)
    if(one != null){
        return response.send({
            success: true,
            product: one
        })
    }
    else{
        return response.send('Producto no existente')
    }

}
server.get(one_route,one_function)

let cart_route = '/api/carts/:pid'
let cart_function = (request,response) =>{
    let parameter = request.params
    let id = Number(parameter.id)
    let one = carts.getCartById(id)
    if(one != null){
        return response.send({
            success: true,
            product: one
        })
    }
    else{
        return response.send('Carrito no existente')
    }

}
server.get(cart_route,cart_function)

let query_route = '/api/products'
let query_function = (req,res)=>{
    let limit = req.query.limit ?? 100
    let produc = products.getProducts().slice(0,limit)
    return res.send({
        success: true,
        produc
    })
}
server.get(query_route,query_function)

let cart2_route = '/api/carts'
let cart2_function = (req,res)=>{
    let limit = req.query.limit ?? 100
    let produc = carts.getCarts().slice(0,limit)
    return res.send({
        success: true,
        produc
    })
}
server.get(cart2_route,cart2_function)

server.post(
    '/api/products',
    (req,res)=>{
        let title = req.body.title ?? null
        let description = req.body.description ?? null
        let price = req.body.price ?? null
        let thubmnail = req.body.thubmnail ?? null
        let stock = req.body.stock ?? null
        if(title&&description&&price&&thubmnail&&stock){
            products.addProduct( title,description,price,thubmnail,stock)
            return res.json({
                status: 201,
                message: 'Created'
            })
        } else {
            return res.json({
                status: 400,
                message: 'Complete all the information'
            })
        }
        
    }
)

server.post(
    '/api/carts',
    (req,res)=>{
        let products = req.body.products ?? null
        if(products){
            carts.addCart( products)
            return res.json({
                status: 201,
                message: 'Created'
            })
        } else {
            return res.json({
                status: 400,
                message: 'Complete all the information'
            })
        }
        
    }
)
    
server.put(
    '/api/products/:pid',
    (req,res)=>{
        let id = Number(req.params.id)
        let product = req.body
        if(id&&product){
            products.updateProduct(id,product)
            return res.json({
                status: 201,
                message: 'Success'
            })
        } else{
            return res.json({
                status: 400,
                message: 'Cannot be updated'
            })
        }
    }
)

server.use('/api/products', productsRouter)
server.use('/api/carts', cartsRouter)