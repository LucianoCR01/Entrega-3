import { productos } from "./clases.js";
import Express from "express";

const app = Express()

app.get("/products", async (req, res) => {
    const idQuery = req.query.id
    if (idQuery) {
        const arrayProd = await productos.getProducts()
        const newArray = arrayProd.slice(0, idQuery)
        res.json(newArray)
    } else {
        res.json(await productos.getProducts())
    }
})

app.get("/products/:pid", async (req, res) => {
    const idParam = req.params.pid
    res.json(await productos.getProductById(idParam))
})


const PORT = 8080

app.listen(PORT, () => console.log(`Servicdor escuchando http://localhost:${PORT}/`));