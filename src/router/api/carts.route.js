import {Router} from 'express'
import cart from './../../managers/carts.json'

const router = Router()

router.get('/:cid',
(req,res)=>{
    let cart = cart.getCarts()
    if (cart.lenght>0){
        return res.json({Status:200,cart})
    }
    else{
        let message = 'not found'
        return res.json({status:404,message})
    }
}
)

router.post('/',
(req,res)=>{
    let data = data.cart.addCart(req.body)
    if(data){
        return res.json({status: 201, message: 'Created'})
    } else {
        return res.json({ status: 400, message: 'Complete all the information'})
    }
})

router.put('/:cid',
(req,res)=>{
    let id = Number(req.params.id)
    let data = req.body
    let cart = cart.updateCart(id,cart)
    if(cart){
        return res.json({status: 201,message: 'Success'})
    } else{
        return res.json({status: 404,message: 'Cannot be updated'})
    }
})

router.delete('/',
(req,res)=>{
    let parameter = req.params
    let id = Number(parameter.id)
    let one = cart.deleteProduct(id)
    if(one != null){
        return res.send({success: true,cart: one})
    }
    else{
        return res.send('Cannot be found')}
    }
)

export default router