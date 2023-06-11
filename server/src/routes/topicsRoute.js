import { Router } from 'express'
import TopicController from '../modules/topics/topicController.js'

const route = Router()
const topicController = new TopicController()

route.get('/', topicController.getTopicAll)

route.post('/', topicController.createPost)

export default route
