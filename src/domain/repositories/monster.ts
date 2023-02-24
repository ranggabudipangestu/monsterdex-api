import * as dto from "../dtos/monster";
import Monster from "../../models/monster";
import { ObjectId } from "mongoose/lib/types";
import { MonsterData } from "../dtos/monster";

interface IMonsterRepository {
  create(input: dto.MonsterData): Promise<boolean>
  getAll(filter: dto.MonsterFilter, pagination: dto.Pagination, sort: dto.Sort): Promise<any>
  getById(id: string): Promise<any>
  delete(id: string): Promise<boolean>
  update(id: string, input:dto.MonsterData): Promise<boolean>
  capture(id: string): Promise<boolean>
}

export class MonsterRepository implements IMonsterRepository {
  async create(input: dto.MonsterData): Promise<boolean> {
    try {
        await Monster.create({
          name: input.name,
          category: input.category,
          description: input.description,
          isCatched: false,
          imageUrl: input.imageUrl,
          types: input.types,
          stats: input.stats
        });

      return true
    } catch (error) {
      return false
    }
  }

  async getAll(filter: dto.MonsterFilter, pagination: dto.Pagination, sort:dto.Sort): Promise<any> {
    const match = {}
    const newSort = {}
    if(filter){
      if(filter.name){
        match['name'] = new RegExp(filter.name, "i")
      }
  
      if(filter.types){
        match['types'] = {
          $in: filter.types
        }
      }
    }


    if(sort){
      const { id, name } = sort
    
      if(id && id.toUpperCase() === 'ASC') newSort['_id'] = 1
      else if(id && id.toUpperCase() === 'DESC') newSort['_id'] = -1
  
      if(name && name.toUpperCase() === 'ASC') newSort['name'] = 1
      else if(name && name.toUpperCase() === 'DESC') newSort['name'] = -1
    }
    
    
    const result = await Monster.aggregate([
      { $match: match },
      { $sort: newSort || { _id:1 } },
      { $skip: Number(pagination.page) || 0 },
      { $limit: Number(pagination.limit) || 1000 },
    ])

    return result
  }

  async getById(id: string): Promise<any> {
    const monster = await Monster.findOne({ _id: ObjectId(id) })

    if(!monster) return null
    return monster
  }

  async delete(id: string): Promise<boolean> {
    try {
      await Monster.deleteOne({ _id:ObjectId(id) })
      return true;
    }catch(error){
      return false
    }
  }

  async update(id: string, input:dto.MonsterData): Promise<boolean> {
    try {
      await Monster.updateOne({ _id: ObjectId(id) }, { $set: input })
      return true
    } catch (error) {
      return false
    }
  }

  async capture(id: string): Promise<boolean> {
    try {
      await Monster.updateOne({ _id: ObjectId(id) }, { $set: { isCatched: true } })
      return true
    } catch (error) {
      return false
    }
  }
}