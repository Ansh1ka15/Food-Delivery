import foodModel from "../models/foodModel.js";
import fs from 'fs';

//add food item

const addFood = async (req,res) => {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })

    try {
        await food.save()
        res.status(200).json({message: "Food Item Added Successfully"})
    } catch (error) {
        fs.unlinkSync(`uploads/${image_filename}`)
        res.status(500).json({message: "Error Adding Food Item"})
    }
}

// all food list
const listFood = async (req,res) => {
    try{
        const foods = await foodModel.find({});
        res.json({succes:true,data:foods});
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// remove food item
const removeFood = async(req,res) =>{
    try{
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Food Removed"})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
export {addFood,listFood,removeFood}
