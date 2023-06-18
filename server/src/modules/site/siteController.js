import { errorResponse, successResponse } from '../../utils/response.js'
import siteRepository from '../site/siteRepository.js'

export default class SiteController {
    // [GET] /search
    async getSearchResults(req, res) {
        try {
            const result = await siteRepository.getSearchResults(req.query)
            if (result.error) {
                res.json(errorResponse({ message: result.error }))
            } else {
                const newUsers = result.map((user) => {
                    const { __v, password, updatedAt, ...passProps } = user

                    return passProps
                })

                res.json(
                    successResponse({
                        data: {
                            total: newUsers.length,
                            data: newUsers,
                        },
                    })
                )
            }
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }

    // [GET] /showPosts
    async getShowPosts(req, res) {
        try {
            const result = await siteRepository.getShowPosts()
            if (result.error) {
                res.json(errorResponse({ message: result.error }))
            } else {
                const newPosts = result.map((post) => {
                    const { __v, updatedAt, ...passProps } = post

                    return passProps
                })

                res.json(
                    successResponse({
                        data: newPosts.reverse(),
                    })
                )
            }
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }

    // [GEt] /forumStatistics
    async getForumStatistics(req, res) {
        try {
            const result = await siteRepository.getForumStatistics()
            if (result.error) {
                res.json(errorResponse({ message: result.error }))
            } else {
                res.json(
                    successResponse({
                        data: result,
                    })
                )
            }
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }

    // [GEt] /topPosts
    async getTopPosts(req, res) {
        try {
            const result = await siteRepository.getShowPosts()
            if (result.error) {
                res.json(errorResponse({ message: result.error }))
            } else {
                const newPosts = result.map((post) => {
                    const { __v, updatedAt, ...passProps } = post

                    return passProps
                })

                res.json(
                    successResponse({
                        data: newPosts.reverse(),
                    })
                )
            }
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }
}
