import { Router } from 'express'
import TopicController from '../modules/topics/topicController.js'

const route = Router()
const topicController = new TopicController()

route.get('/', topicController.index)

route.get('/:id', topicController.show)

export default route
