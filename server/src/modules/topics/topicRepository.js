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

    async createTopic({ corner, title, desc, totalTopics, postShowId }) {
        try {
            const newTopic = await Topic.create({
                corner,
                title,
                desc,
                totalTopics,
                postShowId,
            })

            return newTopic
        } catch (err) {
            return { error: err.message }
        }
    }
}

export default new TopicRepository()
