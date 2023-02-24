import { UserRepository } from "../../domain/repositories/user";
import { UserService } from "../../domain/services/user";
import { UserController } from "../../infrastructure/controllers/user";


export class UserFactory {
  static init() {
    const repository = new UserRepository();
    const service = new UserService(repository);
    const controller = new UserController(service);

    return controller;
  }
}