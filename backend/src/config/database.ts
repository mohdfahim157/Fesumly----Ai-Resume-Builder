import mongoose, { Schema, model, Types } from "mongoose";




async function connectToDB() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in .env");
  }
    const URI: string = process.env.MONGO_URI;

  try {
    await mongoose.connect(URI);
    console.log("Connected To DataBase ");
  } catch (error) {
    if (error instanceof Error) {
    console.log("Connection to DataBase Failed ",error.message)
  }
  }
}

export default connectToDB;
