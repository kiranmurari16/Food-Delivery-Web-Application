import  express  from 'express';
import authmiddleware from '../middleware/auth.js';
import { listorders, placeorder, updateStatus, userorder, verifyorder } from '../controllers/ordercontroller.js';

const orderrouter = express.Router()

orderrouter.post("/place",authmiddleware,placeorder)
orderrouter.post("/verify",verifyorder)
orderrouter.post("/userorders",authmiddleware,userorder)
orderrouter.get("/list",listorders)
orderrouter.post("/status",updateStatus)


export default orderrouter;