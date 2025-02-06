import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodrouter from './routes/foodroute.js';
import userrouter from './routes/userroute.js';
import 'dotenv/config'
import cartrouter from './routes/cartroutr.js';
import orderrouter from './routes/orderrouter.js';



//app configration
const app = express();
const port =4000

//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();

//api endpoints
app.use("/api/food", foodrouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userrouter)
app.use("/api/cart", cartrouter)
app.use("/api/order", orderrouter)

app.get("/", (req, res)=>{
    res.send("API is working")
})



app.listen(port,()=>{
    console.log(`server started on port ${port}`)
})