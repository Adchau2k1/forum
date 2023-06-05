import express, { json } from 'express'
import morgan from 'morgan'
import { config } from 'dotenv'

async function main() {
    const app = express()

    // Http logger
    app.use(morgan('combined'))
    app.use(json())
    config()

    app.get('/', (req, res) => {
        res.send('Trang chủ')
    })

    app.get('/api', (req, res) => {
        const data = [
            {
                id: 1,
                name: 'Test',
            },
            {
                id: 2,
                name: 'Admin',
            },
        ]

        res.json(data)
    })

    const PORT = process.env.PORT
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
}

main().catch((err) => console.log(err))
