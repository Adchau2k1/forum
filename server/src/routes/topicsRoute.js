import { Router } from 'express'
import TopicController from '../modules/topics/topicController.js'

const route = Router()
const topicController = new TopicController()

route.get('/', topicController.getTopicAll)

route.post('/', topicController.createTopic)

route.put('/', topicController.updateTopic)

export default route
