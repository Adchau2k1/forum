import { Router } from 'express'
import UserController from '../modules/users/userController.js'

const route = Router()
const userController = new UserController()

route.get('/', userController.getUserAll)

route.get('/:username', userController.getUserByUsername)

route.post('/login', userController.loginUser)

route.post('/register', userController.createUser)

route.put('/', userController.updateUser)

route.delete('/', userController.deleteUserById)

export default route
