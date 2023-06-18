import { Router } from 'express'
import PostController from '../modules/posts/postController.js'

const route = Router()
const postController = new PostController()

route.get('/', postController.getPostAll)

route.get('/:_id', postController.getPostById)

route.get('/userPosts/:postBy', postController.getPostAllByUsernamePost)

route.post('/', postController.createPost)

route.put('/', postController.updatePost)

route.delete('/', postController.deletePostById)

export default route
