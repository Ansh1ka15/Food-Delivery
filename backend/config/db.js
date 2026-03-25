import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://anshikasingh152812_db_user:Anshika152812@cluster0.lgpxtiq.mongodb.net/FOOD_DELIVERY?retryWrites=true&w=majority').then(() => console.log("DB Connected"));
}