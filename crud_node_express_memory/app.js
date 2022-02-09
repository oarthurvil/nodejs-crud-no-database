const express = require("express");
const { randomUUID } = require("crypto") //gera uma chave id

const app = express();

app.use(express.json());

const products = [];

/* 
    Body - sempre que quiser enviar dados para minha aplicação;
    Params - /product/934859348
    Query - /product?id=29384723987
*/


// POST - Inserir dados

app.post("/products", (request, response) => {
    // Nome e preco - name, price

    const {name, price} = request.body;

    const product = {
        name,
        price,
        id: randomUUID(),
    }

    products.push(product);

    return response.json(product);
})


// GET - Buscar dados

app.get("/products", (request, response) => {
    return response.json(products);
})  

app.get("/products/:id", (request, response) => {
    const { id } = request.params;
    const product = products.find(product => product.id == id);
    return response.json(product);
})  


// PUT - Alterar dados

app.put("/products/:id", (request, response) => {
    const { id } = request.params;
    const { name, price } = request.body;

    const productIndex = products.findIndex(product => product.id == id);
    products[productIndex] = {
        ...products[productIndex],
        name,
        price
    };

    return response.json({ message: "Produto alterado com sucesso!"});
})


// DELETE - Remover dados

app.delete("/products/:id", (request, response) => {
    const { id } = request.params;

    const productIndex = products.findIndex(product => product.id == id);

    products.splice(productIndex, 1);

    return response.json({ message: "Produto removido com sucesso!"});
})



app.listen(4002, () => console.log("Servidor rodando na porta 4002"));