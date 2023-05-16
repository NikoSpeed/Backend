//const fs = require('fs')
import fs from 'fs'
class ProductManager {
    constructor(path){
        this.products = []
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
                .then(res=> this.products = JSON.parse(res))
                .catch(err=>console.log(err))
        }
    }

    getProducts(){
        if(this.products){
        console.log(this.products)
        return this.products
        }
        else{
            console.log('not found')
        }
    }
    addProduct({ title,description,price,thubmnail,stock }){
        let product = { title,description,price,thubmnail,stock}
        let id = 0
        if (this.products.length===0) {
            id = 1
            product.id = id
        } else {
            let lastProduct = this.products[this.products.length-1]
            id = lastProduct.id + 1
            product.id = id
        }
        this.products.push(product)
        let product_json = JSON.stringify(this.products,null,2)
        fs.promises.writeFile(this.path,product_json)
        .then(console.log('Product Created'))
        .catch(err=>console.log(err))
    }

    getProductsById(id){
        let search = this.products.find(each=> each.id === id)
        if (search) {
            console.log(search)
            return search
        }
        console.log('not found')
        return null
    }

    updateProduct(id,product){
        let update = this.getProductsById(id)
        for (let prop in product){
            update[prop] = product[prop]
        }
        let product_json = JSON.stringify(this.products,null,2)
        fs.promises.writeFile(this.path,product_json)
        .then(console.log('Product Updated: '+id))
        .catch(err=>console.log(err))
    }


    deleteProduct(id){
        this.products = this.products.filter(each=>each.id!==id)
        let products_json = JSON.stringify(this.products,null,2)
        fs.promises.writeFile(this.path,products_json)
        .then(console.log('Product Eliminated: '+id))
        .catch(err=>console.log(err))
    }
}

let product = new ProductManager('./src/data/products.json')

export default product