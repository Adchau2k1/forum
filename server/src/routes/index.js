import siteRouter from './siteRoute.js'
import usersRouter from './usersRoute.js'
import topicsRouter from './topicsRoute.js'

export default function route(app) {
    app.use('/users', usersRouter)
    app.use('/topics', topicsRouter)
    app.use('/', siteRouter)
}
