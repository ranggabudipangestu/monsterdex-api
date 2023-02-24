import mongoose from 'mongoose'
import { ObjectId } from 'mongoose/lib/types'
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
  ObjectId.prototype.valueOf = function () {
    return this.toString()
  }
  await mongoose.connect(process.env.MONGO_DATABASE_URL)
  return mongoose
}

