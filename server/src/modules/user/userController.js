import User from './UserModel.js'

export default class UserController {
    // [GET] /user
    async getAll(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Internal server error' })
        }
    }

    // [GET] /user/:id
    async getOne(req, res) {
        try {
            const id = req.params.id
            const users = await User.findById(id)
            res.json(users)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Internal server error' })
        }
    }
}
