import express, { json } from 'express'
import morgan from 'morgan'
import { config } from 'dotenv'
import route from './routes/index.js'
import { configServices } from './config.js'
import connect from './database/index.js'
import checkToken from './authentication/auth.js'

async function main() {
    config()
    // Kết nối database
    connect()

    const app = express()
    // Http logger
    // app.use(morgan('combined'))
    // Check đăng nhập
    app.use(checkToken)
    app.use(json())
    // Chạy các routes
    route(app)

    const PORT = configServices.getPort() || 5000
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
}

main().catch((err) => console.log(err))
