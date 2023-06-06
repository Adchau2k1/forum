import siteRouter from './siteRoute.js'
import postRouter from './topicRoute.js'

export default function route(app) {
    app.use('/topic', postRouter)
    app.get('/', siteRouter)
}
