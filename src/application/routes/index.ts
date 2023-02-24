import { Router } from "express"
import { MonsterFactory } from "../factories/monster"
import { UserFactory } from "../factories/user"

import Jwt from "../../infrastructure/utils/token"
import formData from "express-form-data"
import os from "os"
import { MediaController } from "../../infrastructure/controllers/media"

const jwt: Jwt = new Jwt()
const userFactory = UserFactory.init()
const monsterFactory = MonsterFactory.init()
const mediacontroller = new MediaController()
const options = {
  uploadDir: os.tmpdir(),
  autoClean: true
}

export const init = (APIRouter: Router)=> {
  APIRouter.post('/auth/signup', (req, res) => userFactory.signUp(req, res))
  APIRouter.post('/auth/signin', (req, res) => userFactory.signIn(req, res))

  APIRouter.post('/monster', jwt.isAuthenticated, formData.parse(options), (req, res) => monsterFactory.createMonster(req, res))
  APIRouter.get('/monsters', (req, res) => monsterFactory.getMonsters(req, res))
  APIRouter.get('/monster/:id', (req, res) => monsterFactory.getMonsterById(req, res))
  APIRouter.put('/monster/:id', jwt.isAuthenticated, formData.parse(options), (req, res) => monsterFactory.updateMonster(req, res))
  APIRouter.delete('/monster/:id', jwt.isAuthenticated, (req, res) => monsterFactory.deleteMonster(req, res))
  APIRouter.post('/monster/:id/capture', jwt.isAuthenticated, (req, res) => monsterFactory.captureMonster(req, res))
  APIRouter.get('/media/:filename', (req, res) => mediacontroller.media(req, res))
}