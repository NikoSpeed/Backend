//const fs = require('fs')
import fs from 'fs'
class CartManager {
    constructor(path){
        this.carts = []
        this.path = path
        this.init(path)
    }

    init(path){
        let file = fs.existsSync(path)
        if (!file){
            fs.promises.writeFile(path,'[]')
            .then(console.log('File created'))
            .catch(err=>console.log(err))
        }  
        else{
            fs.promises.readFile(path,'utf-8')
                .then(res=> this.carts = JSON.parse(res))
                .catch(err=>console.log(err))
        }
    }

    getCarts(){
        if(this.carts){
        console.log(this.carts)
        return this.carts
        }
        else{
            console.log('not found')
        }
    }
    addCart(){
        let cart = {products: []}

        if (this.carts.length>0) {
            let next_id = this.carts[this.carts.length-1].id+1
            cart.id = next_id
        } else {
            cart.id = 1
        }
        this.carts.push(cart)
        let cart_json = JSON.stringify(this.carts,null,2)
        fs.promises.writeFile(this.path,cart_json)
        .then(console.log('Cart Created'))
        .catch(err=>console.log(err))
    }

    getCartById(id){
        let search = this.carts.find(each=> each.id === id)
        if (search) {
            console.log(search)
            return search
        }
        console.log('not found')
        return null
    }

    updateCart(id,cart){
        let update = this.getCartById(id)
        for (let prop in cart){
            update[prop] = cart[prop]
        }
        let cart_json = JSON.stringify(this.carts,null,2)
        fs.promises.writeFile(this.path,cart_json)
        .then(console.log('Cart Updated: '+id))
        .catch(err=>console.log(err))
    }


    deleteCart(id){
        this.carts = this.carts.filter(each=>each.id!==id)
        let carts_json = JSON.stringify(this.carts,null,2)
        fs.promises.writeFile(this.path,carts_json)
        .then(console.log('Cart Eliminated: '+id))
        .catch(err=>console.log(err))
    }
}

let cart = new CartManager('./carts.json')

export default cart