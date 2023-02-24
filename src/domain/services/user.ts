import { UserRepository } from "../repositories/user"
import { CreateUser, Login, Token } from "../dtos/user"
import Jwt from "../../infrastructure/utils/token";
import Hash from "../../infrastructure/utils/hashing";
import { loginValidation } from "../validator/loginValidation";
import { signUpValidation } from "../validator/signUpValidation";

export interface IUserService {
  signUp(input:CreateUser): Promise<string>
  signIn(input: Login): Promise<Token>
}

export class UserService implements IUserService {
  private hashing:Hash
  private jwt: Jwt
  
  constructor(
    private repository: UserRepository
  ){
    this.hashing = new Hash()
    this.jwt = new Jwt()
  }

  async createAdmin(input: CreateUser): Promise<string> {
    try{
      let { password } = input
      const { email, username } = input
      const checkExists = await this.repository.getUserByEmailOrUsername({ email })
      if(checkExists) throw new Error('Email or Username is already exist')
      password = this.hashing.hash(password)
      const result = await this.repository.create({ email, username, password, role:'USER' });
      if(!result) new Error('Failed to Signup')
      return 'Successfully signUp'
    }catch(err){
      throw new Error(err)
    }
  }

  async signUp(input: CreateUser): Promise<any> {
    try{
      await signUpValidation(input)
    }catch(err){
      return { error: true, message: err.message }
    }

    try{
      let { password } = input
      const { email, username } = input
      const checkExists = await this.repository.getUserByEmailOrUsername({ email })
      if(checkExists) return { error: true, message: "Username or email already exist" }
      password = this.hashing.hash(password)
      await this.repository.create({ email, username, password, role:'USER' });
      
      return {
        error:false,
        data: 'Successfully signUp'
      }
    }catch(err){
      return {
        error:true,
        data: err
      }
    }
  }


  async signIn(input: Login): Promise<any> {
    try{
      await loginValidation(input)
    }catch(err){
      return { error: true, message: err.message }
    }

    try{
      const { email, password } = input
      const result = await this.repository.getUserByEmailOrUsername({ email });
      if(!result) return{ error: true, message: "Username or email doen't exist" }

      const isSame = await this.hashing.compare(password, result.password);

      if(result && isSame){
        const token = this.jwt.encode({
          id: result.id,
          email: result.email,
          username: result.username,
          role: result.role
        })
        return {
          error:false,
          token
        }
      }

    }catch(err){
      return { error: true, message: err }
    }
  }

 
}