const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const uri = "mongodb+srv://CollinC3:Collsta1$@test-for-full-stack.xmzfkxh.mongodb.net/?retryWrites=true&w=majority&appName=Test-for-Full-Stack";
const Product = require('./models/productModel');

app.use(express.json());

async function connect () {
    await mongoose.connect(uri);
    console.log("Connected to Database");
}

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({products});
    } catch (error) {
        res.status(500).json({"message": "Server Error"});
    }
})

app.get('/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json({product});
    } catch (error) {
        res.status(500).json({"message": "Server Error"});
    }
})

app.post('/product', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json({"message": "saved to database"});
    } catch (error) {
        res.status(500).json({"message": "Server Error"});
    }
});

app.put('/update_product/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body,{returnDocument: 'after'});
        if(!product) {
            return res.status(404).json({"message": "Cannot find product"});
        }
        res.status(200).json({product});
    } catch (error) {
        res.status(500).json({"message": "Server Error"});
    }
})

app.delete('/delete_product/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product) {
            return res.status(404).json({"message": "Cannot find product"});
        }
        res.status(200).json({product});
    } catch (error) {
        res.status(500).json({"message": "Server Error"});
    }
});

app.listen(5000, () =>{
    console.log(`Listening on port ${port}`);
});

connect();