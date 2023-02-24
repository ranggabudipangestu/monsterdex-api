import { Request } from "express";
import { Pagination } from "../../domain/dtos/monster";
import { MonsterService } from "../../domain/services/monster";
import { uploadFile } from "../utils/file/uploadFile";
import { responseWrapper } from "../utils/responseWrapper";

interface IMonsterController {
  createMonster(req, res);
  updateMonster(req, res);
  deleteMonster(req, res);
  getMonsters(req, res);
  getMonsterById(_, { id }, req);
}
export class MonsterController implements IMonsterController {
  constructor(private service: MonsterService) {}

  async createMonster(req, res) {
    try {
      
      const haveAccess = await this._isHaveAccess(res.locals.userData, 'ADMIN')
      
      if (!haveAccess){
        return responseWrapper(
          res,
          401,
          false,
          "You don't have access to create monster",
          null
        );
      }

      const input = req.body;
      const { image } = req.files
      const filename = image.path.split('/').pop().toLowerCase()
      
      input.imageUrl = `${process.env.BASE_URL}/media/${await uploadFile(image.path, filename)}`

      const result = await this.service.create(input);
      
      if (result.error) {
        return responseWrapper(res, 400, false, result.message, null);
      }

      return responseWrapper(res, 200, true, null, result.data);
    } catch (err) {
      console.log(err)
      return responseWrapper(res, 500, false, "INTERNAL SERVER ERROR", null);
    }
  }

  async updateMonster(req: Request, res) {
    try {
      const haveAccess = await this._isHaveAccess(res.locals.userData, 'ADMIN')
      if (!haveAccess){
        return responseWrapper(
          res,
          401,
          false,
          "You don't have access to update monster",
          null
        );
      }

      const id = req.params.id;
      const input = req.body;
      const result = await this.service.update(id, input);
      if (result.error) {
        return responseWrapper(res, 400, false, result.message, null);
      }
      return responseWrapper(res, 200, true, null, result.data);
    } catch (err) {
      return responseWrapper(res, 500, false, "INTERNAL SERVER ERROR", null);
    }
  }

  async deleteMonster(req: Request, res) {
    try {
      const haveAccess = await this._isHaveAccess(res.locals.userData, 'ADMIN')
      if (!haveAccess){
        return responseWrapper(
          res,
          401,
          false,
          "You don't have access to delete monster",
          null
        );
      }

      const id = req.params.id;
      const result = await this.service.delete(id);
      if (result.error) {
        return responseWrapper(res, 400, false, result.message, null);
      }
      return responseWrapper(res, 200, true, null, result.data);
    } catch (err) {
      return responseWrapper(res, 500, false, "INTERNAL SERVER ERROR", null);
    }
  }

  async getMonsters(req, res) {
    try {
      const { filter, page, limit, sort } = req.query;

      const pagination: Pagination = {
        page: page ? page : 0,
        limit: limit ? limit : 1000,
      };

      const result = await this.service.getAll(filter, pagination, sort);
      return responseWrapper(
        res,
        200,
        true,
        "Data successfully fetched",
        result
      );
    } catch (err) {
      return responseWrapper(res, 500, false, "INTERNAL SERVER ERROR", null);
    }
  }

  async getMonsterById(req, res) {
    try {
      const id = req.params.id;
      const result = await this.service.getById(id);
      return responseWrapper(res, 200, true, "Data successfully fetched", result);
    } catch (err) {
      return responseWrapper(res, 500, false, "INTERNAL SERVER ERROR", null);
    }
  }

  async captureMonster(req: Request, res) {
    
    try {
      const haveAccess = await this._isHaveAccess(res.locals.userData, 'USER')
      if (!haveAccess){
        return responseWrapper(
          res,
          401,
          false,
          "You don't have access to capture monster",
          null
        );
      }
      const id = req.params.id;
      const result = await this.service.capture(id);
      if (result.error) {
        return responseWrapper(res, 400, false, result.message, null);
      }
      return responseWrapper(res, 200, true, null, result.data);
    } catch (err) {
      return responseWrapper(res, 500, false, "INTERNAL SERVER ERROR", null);
    }
  }

  async _isHaveAccess(userData: any, roleNeeded: string) {
      const { data } = userData;
      const { role } = data;
      return role === roleNeeded
    
  }
}
