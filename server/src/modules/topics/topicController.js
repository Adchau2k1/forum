import { errorResponse, successResponse } from '../../utils/response.js'
import topicRepository from './topicRepository.js'
import { DEFAULT_PAGE_SIZE } from '../../common/constants.js'

export default class TopicController {
    // [GET] /topics
    async getTopicAll(req, res) {
        try {
            const { page = 1, pageSize = DEFAULT_PAGE_SIZE, isAll } = req.query
            const result = await topicRepository.getTopicAll({ page, pageSize, isAll })

            if (result.error) {
                res.json(errorResponse({ message: result.error }))
            } else {
                const newTopics = result.map((topic) => {
                    let data
                    if (isAll) data = topic._doc
                    else data = topic
                    const { __v, updatedAt, ...passProps } = data

                    return passProps
                })
                res.json(
                    successResponse({
                        data: newTopics,
                    })
                )
            }
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }

    // [POST] /topics
    async createTopic(req, res) {
        try {
            const result = await topicRepository.createTopic(req.body)

            if (result.error) {
                res.json(errorResponse({ message: result.error }))
            } else {
                res.status(201).json(
                    successResponse({
                        message: 'Tạo chuyên mục thành công',
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

    // [PUT] /topics
    async updateTopic(req, res) {
        try {
            const result = await topicRepository.updateTopic(req.body)

            if (result.error) {
                res.json(errorResponse({ message: result.error }))
            } else {
                res.status(201).json(
                    successResponse({
                        message: 'Cập nhật chuyên mục thành công',
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
}
