class ConfigServices {
    getPort() {
        return process.env.PORT
    }

    getDBConfig() {
        return {
            URL: process.env.DB_URL,
            Name: process.env.DB_NAME,
        }
    }
}

export const configServices = new ConfigServices()
