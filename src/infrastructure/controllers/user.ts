import { Request, Response, Router } from "express"
import { UserService } from "../../domain/services/user"
import { responseWrapper } from "../utils/responseWrapper"

interface IUserController{
  signUp(req, res)
  signIn(req, res)
}
export class UserController implements IUserController{
  constructor(
    private service: UserService
  ){}

  async signUp(req: Request, res: Response){
    try{
      const input = req.body
      const result = await this.service.signUp(input)
      if (result.error) {
        return responseWrapper(res, 400, false, result.message, null);
      }
      return responseWrapper(res, 200, true, result.message, result.data);
    }catch(err){
      return responseWrapper(res, 500, false, "INTERNAL SERVER ERROR", null);
    }
  }

  async signIn(req: Request, res: Response){
    try{
      const input = req.body
      const result = await this.service.signIn(input)
      console.log(result)
      // if (result.error) {
      //   return responseWrapper(res, 400, false, result.message, null);
      // }
      return responseWrapper(res, 200, true, result.message, result.token);
    }catch(err){
      console.log(err)
      return responseWrapper(res, 500, false, "INTERNAL SERVER ERROR", null);
    }
  }
  
  init(APIRouter: Router) {
    APIRouter.post('/auth/signup', (req, res) => this.signUp(req, res))
    APIRouter.post('/auth/signin', (req, res) => this.signIn(req, res))
  }
  
}
