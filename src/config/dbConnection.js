import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongo DB connection successfull: ${connect.connection.host}, ${connect.connection.name}`);
  } catch (error) {
    console.log("Mongo DB connection failed: ", error);
    process.exit(1);
  }
}

export default dbConnection;