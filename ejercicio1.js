class ProductManager {
    constructor(){
        this.products = []
    }

    getProducts(){
        console.log(this.products)
        return this.products
    }

    addProduct({ title,descripcion,price,thubmnail,stock }){
        let id = 0
        if (this.products.length===0) {
            id = 1
        } else {
            let lastProduct = this.products[this.products.length-1]
            id = lastProduct.id + 1
        }
        let producto = { title,descripcion,price,thubmnail,stock,id}
        this.products.push(producto)
    }

    getProductsById(){
        let consulta = this.products.find(each=> each.id === event_id)
        if (consulta) {
            console.log(consulta)
            return consulta
        }
        console.log('not found')
        return null
    }

}

let producto = new ProductManager()
producto.addProduct({title:'amuleto', descripcion:'pasiva', price: 5, thubmnail:'', stock:10 })
producto.addProduct({title:'mascara', descripcion:'pasiva', price: 10, thubmnail:'', stock:3 })
producto.getProducts()
ticket.getProductsById(2)