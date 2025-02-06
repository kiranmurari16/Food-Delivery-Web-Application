import foodModel from "../models/foodmodel.js";
import fs from 'fs'

const addfood = async (req,res)=>{

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try{
        await food.save();
        res.json({success:true,message:"Food Added"})
    } catch (error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

//display food
const listfood = async (req,res) =>{
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

const removefood = async (req,res) =>{
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Deleted successfully"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
    }
}

export {addfood, listfood, removefood}