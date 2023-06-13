import mongoose from 'mongoose'

import { configServices } from '../config.js'

export default async function connect() {
    try {
        const dbConfig = configServices.getDBConfig()
        await mongoose.connect(`${dbConfig.URL}/${dbConfig.Name}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log('Kết nối thành công')
    } catch (error) {
        console.log(error)
    }
}
