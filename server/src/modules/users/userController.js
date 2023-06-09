import jwt from 'jsonwebtoken'
import UserRepository from './userRepository.js'
import { successResponse, errorResponse } from '../../utils/response.js'

const userRepository = new UserRepository()

export default class UserController {
    // [GET] /users
    async getUserAll(req, res) {
        try {
            const result = await userRepository.getUserAll(req.query)

            if (result.error) {
                res.json(errorResponse({ message: result.error, data: {} }))
            } else {
                const newUsers = result.map((user) => {
                    const { password, __v, createdAt, updatedAt, ...passProps } = user._doc
                    return passProps
                })
                res.json(
                    successResponse({
                        total: newUsers.length,
                        data: newUsers,
                    })
                )
            }
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }

    // [GET] /users/:_id
    async getUserById(req, res) {
        try {
            const result = await userRepository.getUserById(req.params._id)

            if (result.error) {
                res.json(errorResponse({ message: result.error, data: {} }))
            } else {
                const { password, __v, createdAt, updatedAt, ...newUser } = result._doc
                res.json(
                    successResponse({
                        data: newUser,
                    })
                )
            }
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }

    // [POST] /users/login
    async loginUser(req, res) {
        try {
            const result = await userRepository.loginUser(req.body)

            if (result.error) {
                res.json(errorResponse({ message: result.error, data: {} }))
            } else {
                const { __v, createdAt, updatedAt, ...newUser } = result._doc
                const token = jwt.sign(
                    {
                        data: newUser,
                    },
                    process.env.JWT_SECRET_KEY,
                    {
                        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
                    }
                )

                delete newUser.password
                newUser.token = token

                res.json(
                    successResponse({
                        message: 'Đăng nhập thành công',
                        data: newUser,
                    })
                )
            }
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }

    // [POST] /users/register
    async createUser(req, res) {
        try {
            const result = await userRepository.createUser(req.body)

            if (result.error) {
                res.json(errorResponse({ message: result.error, data: {} }))
            } else {
                res.status(201).json(
                    successResponse({
                        message: 'Đăng ký thành công',
                        data: {
                            id: result._id,
                            username: result.username,
                            email: result.email,
                        },
                    })
                )
            }
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }

    // [DELETE] /users/:id
    async deleteUserById(req, res) {
        try {
            const { _id } = req.body
            const result = await userRepository.deleteUserById({ _id })

            if (result.error) {
                res.json(errorResponse({ message: result.error }))
            } else {
                res.json(
                    successResponse({
                        message: 'Xóa tài khoản thành công',
                        data: {
                            _id,
                        },
                    })
                )
            }
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }
}
