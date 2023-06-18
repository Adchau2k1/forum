import jwt from 'jsonwebtoken'
import userRepository from './userRepository.js'
import { successResponse, errorResponse } from '../../utils/response.js'
import { DEFAULT_PAGE_SIZE } from '../../common/constants.js'

export default class UserController {
    // [GET] /users
    async getUserAll(req, res) {
        try {
            const { page = 1, pageSize = DEFAULT_PAGE_SIZE, isAll } = req.query
            const result = await userRepository.getUserAll({ page, pageSize, isAll })

            if (result.error) {
                res.json(errorResponse({ message: result.error }))
            } else {
                const newUsers = result.map((user) => {
                    let data
                    if (isAll) data = user._doc
                    else data = user
                    const { password, __v, createdAt, updatedAt, ...passProps } = data

                    return passProps
                })
                res.json(
                    successResponse({
                        data: {
                            page: parseInt(page),
                            pageSize: parseInt(pageSize),
                            total: result.total,
                            data: newUsers,
                        },
                    })
                )
            }
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }

    // [GET] /users/:username
    async getUserByUsername(req, res) {
        try {
            const result = await userRepository.getUserByUsername(req.params.username)

            if (result.error) {
                res.json(errorResponse({ message: result.error }))
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
                res.json(errorResponse({ message: result.error }))
            } else {
                const { __v, password, createdAt, updatedAt, ...newUser } = result._doc
                const token = jwt.sign(
                    {
                        data: newUser,
                    },
                    process.env.JWT_SECRET_KEY,
                    {
                        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
                    }
                )

                newUser.accessToken = token

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
                res.json(errorResponse({ message: result.error }))
            } else {
                res.status(201).json(
                    successResponse({
                        message: 'Đăng ký thành công',
                        data: {
                            _id: result._id,
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

    // [PUT] /users
    async updateUser(req, res) {
        try {
            const result = await userRepository.updateUser(req.body)

            if (result.error) {
                res.json(errorResponse({ message: result.error }))
            } else {
                res.status(201).json(
                    successResponse({
                        message: 'Cập nhật tài khoản thành công',
                        data: {
                            _id: req.body._id,
                        },
                    })
                )
            }
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }

    // [DELETE] /users
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
