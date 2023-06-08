import { Router } from 'express'
import UserController from '../modules/users/userController.js'

const route = Router()
const userController = new UserController()

route.get('/', userController.getUserAll)

route.get('/:id', userController.getUserById)

route.post('/login', userController.loginUser)

route.post('/register', userController.createUser)

export default route
