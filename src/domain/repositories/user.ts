import User from "../../models/user";

interface IUserRepository{
  create({ email, password, username }): Promise<boolean>
  getUserByEmailOrUsername({ email }): Promise<any>
}

export class UserRepository implements IUserRepository {
  async create({email, password, username, role}): Promise<boolean> {
    try{
      await User.create({
        email,
        username,
        password,
        role
      });
      return true
    }catch(error){
      return false
    }
  }

  async getUserByEmailOrUsername({ email }): Promise<any> {
    const getData = await User.findOne({
      $or:[
        { email },
        { username: email }
      ]
    })

    return getData
  }
}