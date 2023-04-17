const crypto =  require("crypto")

class ProductManager {
    
    constructor(){
        this.products = []
    }
    
    addProduct(title, description, price, thumbnail, code, stock){
        let id = crypto.randomUUID()
        let argumentos = arguments.length ?? 0


        if (argumentos < 6){
            return console.log("Faltan argumentos")
            }
            else{
            if (this.products.find((e)=>e.code == code)){
            return console.log("el code esta repetido")
            }else{
                this.products.push({
                    title: title,
                    description:description,
                    price:price,
                    thumbnail:thumbnail,
                    code:code,
                    stock:stock,
                    id: id 
                })
            }
        }
    }

    getProducts(){
        let productsList = this.products
        return productsList
    }

    getProductById(id){
        let existID = this.products.find(e => e.id === id)
        if (existID == undefined) {
            return "not found \n"
        } else return existID
    }
}

const productos = new ProductManager()

productos.addProduct("Manzana","Roja",200,"Prueba",123,200)
productos.addProduct("ManzanaVerde","Verde",500,"Prueba",134,200)


console.log(productos.getProducts())

console.log(productos.getProductById(1))

