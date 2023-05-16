import {Router} from "express"
import product from './../../managers/products.json'

const router = Router()

router.get('/:pid',
(req,res)=>{
    let product = product.getProducts()
    if (product.lenght>0){
        return res.json({Status:200,product})
    }
    else{
        let message = 'not found'
        return res.json({status:404,message})
    }
}
)

router.post('/',
(req,res)=>{
    let data = data.product.addProduct(req.body)
    if(data){
        return res.json({status: 201, message: 'Created'})
    } else {
        return res.json({ status: 400, message: 'Complete all the information'})
    }
})

router.put('/:pid',
(req,res)=>{
    let id = Number(req.params.id)
    let data = req.body
    let product = product.updateProduct(id,product)
    if(product){
        return res.json({status: 201,message: 'Success'})
    } else{
        return res.json({status: 404,message: 'Cannot be updated'})
    }
})

router.delete('/',
(req,res)=>{
    let parameter = req.params
    let id = Number(parameter.id)
    let one = product.deleteProduct(id)
    if(one != null){
        return res.send({success: true,product: one})
    }
    else{
        return res.send('Cannot be found')}
    }
)

export default router