import { Router } from 'express'
import UserController from '../modules/user/userController.js'

const route = Router()
const userController = new UserController()

route.use('/:id', userController.getOne)
route.use('/', userController.getAll)

export default route
