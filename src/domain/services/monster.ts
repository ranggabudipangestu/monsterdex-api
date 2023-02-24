import { MonsterRepository } from "../repositories/monster"
import { MonsterData, MonsterFilter, Pagination, Sort } from "../dtos/monster"
import { monsterValidation } from "../validator/monsterValidation"

export interface IMonsterService {
  create(input: MonsterData): Promise<string>
  getAll(filter: MonsterFilter, pagination: Pagination, sort:Sort): Promise<MonsterData[]>
  getById(id: string): Promise<MonsterData>
  delete(id: string): Promise<any>
  update(id: string, input: MonsterData): Promise<any>
  capture(id: string): Promise<any>
}

export class MonsterService implements IMonsterService {
  constructor(
    private repository: MonsterRepository
  ) { }

  async create(input: MonsterData): Promise<any> {
    try{
      await monsterValidation(input)
    }catch(err){
      return { error: true, message: err.message }
    }

    try {
      await this.repository.create(input);
      return { error: false, data: 'SUCCESS' }
    } catch (err) {
      return { error: true, message: err }
    }
  }

  async getById(id: string): Promise<MonsterData> {
    try {
      const result = await this.repository.getById(id)
      if(!result) return null
      
      return result
    } catch (error) {
      throw new Error(error)
    }

  }

  async getAll(filter: MonsterFilter, pagination: Pagination, sort:Sort): Promise<MonsterData[]> {
    if(pagination.page > 0) pagination.page -= 1
    const result = await this.repository.getAll(filter, pagination, sort)
    return result
  }

  async delete(id: string): Promise<any> {
    try {
      await this.repository.delete(id)
      return { error: false, data: 'Data Successfully Deleted' }
    } catch (err) {
      return { error: true, message: err }
    }
  }

  async update(id: string, input:MonsterData): Promise<any>{
    try{
      await monsterValidation(input)
    }catch(err){
      return { error: true, message: err.message }
    }

    try {
      await this.repository.update(id, input);
      return { error: false, data: 'Data Successfully Updated' }
    } catch (err) {
      return { error: true, message: err }
    }
  }
  async capture(id: string): Promise<any>{
    try {
      await this.repository.capture(id);
      return { error: false, data: 'Successfully Captured' }
    } catch (err) {
      return { error: true, message: err }
    }
  }

  
}