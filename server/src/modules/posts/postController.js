import { errorResponse, successResponse } from '../../utils/response.js'
import postRepository from './postRepository.js'
import { DEFAULT_PAGE_SIZE } from '../../common/constants.js'
import mongoose from 'mongoose'

export default class PostController {
    // [GET] /posts
    async getPostAll(req, res) {
        try {
            const { page = 1, pageSize = DEFAULT_PAGE_SIZE, isAll } = req.query
            const result = await postRepository.getPostAll({ page, pageSize, isAll })

            if (result.error) {
                res.json(errorResponse({ message: result.error }))
            } else {
                const newPosts = result.map((post) => {
                    let data
                    if (isAll) data = post._doc
                    else data = post
                    const { __v, updatedAt, ...passProps } = data

                    return passProps
                })
                res.json(
                    successResponse({
                        data: {
                            page: parseInt(page),
                            pageSize: parseInt(pageSize),
                            total: result.total,
                            data: newPosts.reverse(),
                        },
                    })
                )
            }
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }

    // [GET] /posts/:_id
    async getPostById(req, res) {
        try {
            const result = await postRepository.getPostById(req.params._id)

            if (result.error) {
                res.json(errorResponse({ message: result.error }))
            } else {
                const { __v, updatedAt, ...newPost } = result._doc
                res.json(
                    successResponse({
                        data: newPost,
                    })
                )
            }
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }

    // [GET] /posts/userPosts/:postBy
    async getPostAllByUsernamePost(req, res) {
        try {
            const { page = 1, pageSize = DEFAULT_PAGE_SIZE, isAll } = req.query
            const postBy = req.params.postBy
            const result = await postRepository.getPostAllByUsernamePost({
                postBy,
                page,
                pageSize,
                isAll,
            })

            if (result.error) {
                res.json(errorResponse({ message: result.error }))
            } else {
                const newPosts = result.map((post) => {
                    const { __v, updatedAt, ...passProps } = post

                    return passProps
                })
                res.json(
                    successResponse({
                        data: {
                            page: parseInt(page),
                            pageSize: parseInt(pageSize),
                            total: result.total,
                            data: newPosts.reverse(),
                        },
                    })
                )
            }
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }

    // [POST] /posts
    async createPost(req, res) {
        try {
            const result = await postRepository.createPost(req.body)

            if (result.error) {
                res.json(errorResponse({ message: result.error }))
            } else {
                res.status(201).json(
                    successResponse({
                        message: 'Đăng bài thành công',
                        data: {
                            _id: result._id,
                            title: result.title,
                        },
                    })
                )
            }
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }

    // [PUT] /posts
    async updatePost(req, res) {
        try {
            const result = await postRepository.updatePost(req.body)

            if (result.error) {
                res.json(errorResponse({ message: result.error }))
            } else {
                res.status(201).json(
                    successResponse({
                        message: 'Cập nhật bài viết thành công',
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

    // [DELETE] /posts
    async deletePostById(req, res) {
        try {
            const result = await postRepository.deletePostById(req.body)

            if (result.error) {
                res.json(errorResponse({ message: result.error }))
            } else {
                res.json(
                    successResponse({
                        message: 'Xóa bài viết thành công',
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
