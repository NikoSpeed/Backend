import express from 'express'
import products from './ejercicio1.js'

let server = express()

let PORT = 8080
let ready = ()=>console.log('server ready on port: '+PORT)

server.listen(PORT,ready)
server.use(express.urlencoded({extended:true}))

let one_route = '/products/:id'
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

let query_route = '/products'
let query_function = (req,res)=>{
    let limit = req.query.limit ?? 100
    let produc = products.getProducts().slice(0,limit)
    return res.send({
        success: true,
        produc
    })
}
server.get(query_route,query_function)