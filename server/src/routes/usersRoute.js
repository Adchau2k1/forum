import { Router } from 'express'
import UserController from '../modules/users/userController.js'

const route = Router()
const userController = new UserController()

route.get('/', userController.getUserAll)

route.get('/:_id', userController.getUserById)

route.post('/login', userController.loginUser)

route.post('/register', userController.createUser)

route.delete('/', userController.deleteUserById)

export default route
