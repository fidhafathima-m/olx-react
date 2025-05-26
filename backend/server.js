import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';

import User from './models/User.js'
import Product from './models/Product.js'

const app = express();
dotenv.config();

app.post('/api/signup', async (req, res) => {
    const userData = req.body;
    if(!userData.name || !userData.email || !userData.password || !userData.phone) {
        return res.status(406).json({success: false, message: 'Sign up failed'});
    }
    try {
        const newUser = new User(userData);
        await newUser.save();
        return res.status(201).json({success: true, message: 'Sign up completed'});
    } catch(err) {
        console.error(`Error: ${err.message}`);
        return res.status(500).json({success: false, message: 'Server Error'});
    }
})

app.post('/api/login', async(req, res) => {
    const userData = req.body;
    if(!userData.email || !userData.password) {
        return res.status(406).json({success: false, message: 'Login failed'});
    }
    try {
        const user = await User.findOne({email: userData.email});
        if(!user) {
            return res.status(406).json({success: false, message: 'User not found'});
        }
        if (user.password !== userData.password) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        return res.status(201).json({ success: true, data: user, message: "Sign up completed" })

    } catch(err) {
        console.error(`Error: ${err.message}`);
        return res.status(500).json({success: false, message: 'Server Error'});
    }
})

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products })
  } catch (error) {
    console.error("Error in fetching products: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" })
  }
})

app.post("/api/products", async (req, res) => {
  const productData = req.body;
  if (!productData.name || !productData.category || !productData.image || !productData.price) {
    return res.status(406).json({ success: false, message: "Creating new Prodcut failed" })
  }
  try {
    const newProduct = new Product(productData);
    await newProduct.save()
    return res.status(201).json({ success: true, data: newProduct, message: "New Product created Successfully" })
  } catch (error) {
    console.error("Error: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" })
  }
})


app.listen(5173, () => {
    connectDB();
    console.log('Server started at http://localhost:5173')
})