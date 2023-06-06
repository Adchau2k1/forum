import express, { json } from 'express'
import morgan from 'morgan'
import route from './routes/index.js'
import { configServices } from './config.js'
import connect from './database/index.js'

async function main() {
    // Connect database
    connect()

    const app = express()

    // Http logger
    app.use(morgan('combined'))
    app.use(json())
    // Routes init
    route(app)

    const PORT = configServices.getPort()
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
}

main().catch((err) => console.log(err))
