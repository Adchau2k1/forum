import express, { json } from 'express'
import morgan from 'morgan'
import { config } from 'dotenv'
import route from './routes/index.js'

async function main() {
    const app = express()

    // Http logger
    app.use(morgan('combined'))
    app.use(json())
    config()
    // Chạy các route
    route(app)

    const PORT = process.env.PORT
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
}

main().catch((err) => console.log(err))
