import userRepository from './userRepository.js'
import { successResponse, errorResponse } from '../../utils/response.js'

export default class UserController {
    // [GET] /users
    async getUserAll(req, res) {
        try {
            const users = await userRepository.getUserAll(req.query)
            res.json(
                successResponse({
                    data: users,
                })
            )
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Internal server error' })
        }
    }

    // [GET] /users/:id
    async getUserById(req, res) {
        try {
            const user = await userRepository.getUserById(req.params.id)
            res.json(
                successResponse({
                    data: user,
                })
            )
        } catch (err) {
            res.json(
                errorResponse({
                    message: err.message,
                })
            )
        }
    }

    // [POST] /users/login
    async loginUser(req, res) {
        try {
            const body = req.body
            res.json(body)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Internal server error' })
        }
    }

    // [POST] /users/register
    async createUser(req, res) {
        try {
            res.send('Đăng ký tài khoản')
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Internal server error' })
        }
    }
}
