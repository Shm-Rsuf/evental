import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("connected...");
    return connect;
  } catch (error) {
    console.log(error);
  }
};
