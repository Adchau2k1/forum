import { Router } from 'express'
import PostController from '../modules/topic/topicController.js'

const route = Router()
const postController = new PostController()

route.use('/:id', postController.show)

// Tuyến đường '/' phải đặt cuối
route.use('/', postController.index)

export default route
