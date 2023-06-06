import siteRouter from './siteRoute.js'
import topicRouter from './topicRoute.js'
import userRouter from './userRoute.js'

export default function route(app) {
    app.use('/topic', topicRouter)
    app.use('/user', userRouter)
    app.use('/', siteRouter)
}
