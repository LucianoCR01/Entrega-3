class ProductManager {
    
    constructor(){
        this.products = []
    }
    
    addProduct(title, description, price, thumbnail, code, stock, id = 0){
        let idd = this.products.length

        if (arguments.length < 6){
            return console.log("Faltan argumentos")
        }

        if (this.products === 0){
            this.products.push({
                title: title,
                description:description,
                price:price,
                thumbnail:thumbnail,
                code:code,
                stock:stock,
                id:id
            })
        }else{
            if (this.products.find((e)=>e.code == code)){
                console.log("el code esta repetido")
            }else{
                this.products.push({
                    title: title,
                    description:description,
                    price:price,
                    thumbnail:thumbnail,
                    code:code,
                    stock:stock,
                    id:idd   
                })
            }
        }
    }

    getProducts(){
        let productsList = this.products.slice();
        console.log(productsList)
    }

    getProductById(id){
        let existID = this.products.find(e => e.id === id)
        if (existID == undefined) {
            console.log("not found \n")
        } else console.log(existID)
    }
}

const productos = new ProductManager()

productos.addProduct("Manzana","Roja",200,"Prueba",123,200)
productos.addProduct("ManzanaVerde","Verde",500,"Prueba",134,200)




productos.getProducts()

productos.getProductById(1)

productos.getProductById(12412)