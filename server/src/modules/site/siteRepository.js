import { MAX_SHOW_POST, MAX_TOP_POST } from '../../common/constants.js'
import Post from '../posts/PostModel.js'
import Topic from '../topics/TopicModel.js'
import User from '../users/UserModel.js'

class SiteRepository {
    async getSearchResults({ q }) {
        try {
            if (!q) return []

            const filteredUsers = await User.aggregate([
                {
                    $match: {
                        $or: [
                            { username: { $regex: q.toLowerCase(), $options: 'i' } },
                            { fullName: { $regex: q.toLowerCase(), $options: 'i' } },
                            { phone: { $regex: q, $options: 'i' } },
                        ],
                    },
                },
                // {
                //     $skip: (page - 1) * pageSize,
                // },
                // { $limit: pageSize },
            ])

            if (filteredUsers) {
                return filteredUsers
            }

            return { error: 'Không có dữ liệu!' }
        } catch (err) {
            return { error: err.message }
        }
    }

    async getShowPosts() {
        try {
            const filteredShowPosts = await Post.aggregate([{ $limit: MAX_SHOW_POST }])

            if (filteredShowPosts) {
                return filteredShowPosts
            }

            return { error: 'Không có dữ liệu!' }
        } catch (err) {
            return { error: err.message }
        }
    }

    async getForumStatistics() {
        try {
            const existingTopics = await Topic.find()
            const existingUsers = await User.find()
            const existingPosts = await Post.find()
            const aveAccess = 210

            return {
                topics: existingTopics?.length,
                posts: existingPosts?.length,
                members: existingUsers?.length,
                aveVisit: aveAccess,
            }
        } catch (err) {
            return { error: err.message }
        }
    }

    async getTopPosts() {
        try {
            const filteredTopPosts = await Post.aggregate([{ $limit: MAX_TOP_POST }])

            if (filteredTopPosts) {
                return filteredTopPosts
            }

            return { error: 'Không có dữ liệu!' }
        } catch (err) {
            return { error: err.message }
        }
    }
}

export default new SiteRepository()
