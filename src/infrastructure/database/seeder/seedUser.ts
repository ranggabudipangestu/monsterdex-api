import { UserRepository } from "../../../domain/repositories/user";
import { connectDB } from "../mongo";
import Hash from "../../utils/hashing";

import dotenv from 'dotenv';
dotenv.config()

const userRepository = new UserRepository();
const seed = async () => {
  const hash = new Hash()
  const db = await connectDB()
  const data = {
    email: "admin@mailinator.com",
    username: "admin",
    password: hash.hash("admin123"),
    role: "ADMIN"
  }
  const getUserExists = await userRepository.getUserByEmailOrUsername({ email: data.email })
  if(!getUserExists){
    const result = await userRepository.create(data);
    console.log(result);
  }

  db.disconnect();
  process.exit(1);
};
seed();
