import fs from "fs"
import crypto from "crypto"


class ProductManager {

    constructor(path) {
        this.path = path
        this.products = []
        const productsString = fs.readFileSync(this.path, "utf-8")
        const products = JSON.parse(productsString)
        this.products = products
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        let id = crypto.randomUUID()
        let argumentos = arguments.length ?? 0

        if (argumentos < 6) {
            return console.log("Faltan argumentos")
        }
        else {
            if (this.products.find((e) => e.code == code)) {
                return console.log("el code esta repetido")
            } else {
                this.products.push({
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    code: code,
                    stock: stock,
                    id: id
                })
                const productsString = JSON.stringify(this.products, null, 2)
                fs.writeFileSync(this.path, productsString)
            }
        }
    }

    async getProducts() {
        if (fs.existsSync(this.path)) {
            let productsList = await fs.promises.readFile(this.path, "utf-8")
            productsList = JSON.parse(productsList)
            return productsList
        } else {
            console.log("Error el archivo no existe")
        }

    }

    async getProductById(id) {
        let productsList = await this.getProducts()
        let existID = productsList.find(e => e.id === id)
        if (existID == undefined) {
            return "not found"
        } else return existID
    }

    async updateProduct(idActualizar, campoActualizar, actualizacion) {
        if (campoActualizar == ["title" || "description" || "price" || "thumbnail" || "code" || "stock"]) {
            let productsList = await this.getProducts()
            let existID = productsList.find(e => e.id == idActualizar)
            let indexID = productsList.findIndex(e => e.id == idActualizar)
            if (existID !== undefined) {
                existID[campoActualizar] = actualizacion
                this.products.splice(indexID, 1, existID)
                fs.writeFileSync(this.path, JSON.stringify(this.products))
            }
        } else if (campoActualizar == "id") {
            console.log("no se puede cambiar el ID")
        } else {
            console.log("no soy un campo")
        }
    }

    async deleteProduct(idBorrar) {
        let productDelete = await fs.promises.readFile(this.path, "utf-8")
        productDelete = JSON.parse(productDelete)
        let indexID = productDelete.findIndex(e => e.id == idBorrar)
        productDelete.splice(indexID, 1)
        fs.writeFileSync(this.path, JSON.stringify(productDelete))
    }
}

export const productos = new ProductManager("./productos.json")

//productos.addProduct("Manzana", "Roja", 200, "Prueba", 123, 200)
//productos.addProduct("ManzanaVerde", "Verde", 500, "Prueba", 134, 200)
//productos.addProduct("Uva", "Violeta", 986, "Prueba", 23, 200)
//productos.addProduct("Mandarina", "Naranja", 75, "Prueba", 9, 200)
//productos.addProduct("Naranja", "Naranja", 850, "Prueba", 98, 200)
//productos.getProducts()

//productos.getProductById("2bef3944-02ad-4aa3-a4cb-19159b9b911d")

//productos.updateProduct("2bef3944-02ad-4aa3-a4cb-19159b9b911d", "title", "Sandia")

//productos.deleteProduct("dd2aff9a-b641-48b9-87eb-3ad1b1f1f463")


