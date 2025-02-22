//used to connecting the database

import mongoose from 'mongoose';

export const connectDB = async () => {
    // console.log('MONGO_URI in db.js :', process.env.MONGODB_URI);
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    // console.log("Databse Connected");                    //Debugging
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

