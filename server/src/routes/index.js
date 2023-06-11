import siteRouter from './siteRoute.js'
import usersRouter from './usersRoute.js'
import topicsRouter from './topicsRoute.js'
import postsRouter from './postsRoute.js'

export default function route(app) {
    // Index
    app.use('/home', siteRouter)

    app.use('/users', usersRouter)

    app.use('/topics', topicsRouter)

    app.use('/posts', postsRouter)
}
