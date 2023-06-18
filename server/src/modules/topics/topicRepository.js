import Topic from './TopicModel.js'

class TopicRepository {
    async getTopicAll({ page, pageSize, isAll }) {
        try {
            const topicAll = await Topic.find()

            page = parseInt(page)
            pageSize = parseInt(pageSize)

            let filteredTopics
            if (!isAll) {
                filteredTopics = await Topic.aggregate([
                    {
                        $match: {},
                    },
                    {
                        $skip: (page - 1) * pageSize,
                    },
                    { $limit: pageSize },
                ])
            } else filteredTopics = topicAll

            if (filteredTopics) {
                filteredTopics.total = topicAll.length
                return filteredTopics
            }

            return { error: 'Không có dữ liệu!' }
        } catch (err) {
            return { error: err.message }
        }
    }

    async createTopic({ corner, title, desc }) {
        try {
            const newTopic = await Topic.create({
                corner,
                title,
                desc,
            })

            return newTopic
        } catch (err) {
            return { error: err.message }
        }
    }

    async updateTopic({ _id, corner, title, desc, totalPosts, postShow }) {
        try {
            const existingTopic = await Topic.findById(_id)
            if (!existingTopic) {
                return { error: 'Chuyên mục không tồn tại!' }
            }

            const updatedAt = new Date()
            const newTopic = await Topic.updateOne(
                { _id },
                {
                    corner,
                    title,
                    desc,
                    totalPosts,
                    postShow,
                    updatedAt,
                }
            )

            return newTopic
        } catch (err) {
            return { error: err.message }
        }
    }
}

export default new TopicRepository()
