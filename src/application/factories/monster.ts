import { MonsterRepository } from "../../domain/repositories/monster";
import { MonsterService } from "../../domain/services/monster";
import { MonsterController } from "../../infrastructure/controllers/monster";


export class MonsterFactory {
  static init() {
    const repository = new MonsterRepository();
    const service = new MonsterService(repository);
    const controller = new MonsterController(service);

    return controller;
  }
}