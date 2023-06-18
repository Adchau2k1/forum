import { Schema } from 'mongoose'
import Post from './PostModel.js'

class PostRepository {
    async getPostAll({ page, pageSize, isAll }) {
        try {
            const postAll = await Post.find()

            page = parseInt(page)
            pageSize = parseInt(pageSize)

            let filteredPosts
            if (!isAll) {
                filteredPosts = await Post.aggregate([
                    {
                        $match: {},
                    },
                    {
                        $skip: (page - 1) * pageSize,
                    },
                    { $limit: pageSize },
                ])
            } else filteredPosts = postAll

            if (filteredPosts.length) {
                filteredPosts.total = postAll.length
                return filteredPosts
            }

            return { error: 'Không có dữ liệu!' }
        } catch (err) {
            return { error: err.message }
        }
    }

    async getPostById(_id) {
        try {
            const existingPost = await Post.findById(_id)

            if (existingPost) {
                return existingPost
            }

            return { error: 'Không tìm thấy bài viết!' }
        } catch (err) {
            return { error: err.message }
        }
    }

    async getPostAllByUsernamePost({ postBy, page, pageSize, isAll }) {
        try {
            const postAll = await Post.aggregate([
                {
                    $match: { postBy },
                },
            ])
            page = parseInt(page)
            pageSize = parseInt(pageSize)

            let filteredUserPosts
            if (!isAll) {
                filteredUserPosts = await Post.aggregate([
                    {
                        $match: { postBy },
                    },
                    {
                        $skip: (page - 1) * pageSize,
                    },
                    { $limit: pageSize },
                ])
            } else filteredUserPosts = postAll

            if (filteredUserPosts) {
                filteredUserPosts.total = filteredUserPosts.length
                return filteredUserPosts
            }

            return { error: 'Không tìm thấy bài viết!' }
        } catch (err) {
            return { error: err.message }
        }
    }

    async createPost({
        topicId,
        topicTitle,
        userPostId,
        usernamePost,
        postBy,
        title,
        content,
        totalPosts,
        totalLikes,
    }) {
        try {
            const newPost = await Post.create({
                topicId,
                topicTitle,
                userPostId,
                usernamePost,
                postBy,
                title,
                content,
                totalPosts,
                totalLikes,
            })

            return newPost
        } catch (err) {
            return { error: err.message }
        }
    }

    async updatePost({ _id, title, content, totalPosts, totalLikes, likedList, comments }) {
        try {
            const existingPost = await Post.findById(_id)
            if (!existingPost) {
                return { error: 'Bài viết không tồn tại!' }
            }

            const updatedAt = new Date()
            const newPost = await Post.updateOne(
                { _id },
                {
                    title,
                    content,
                    totalPosts,
                    totalLikes,
                    likedList,
                    comments,
                    updatedAt,
                }
            )

            return newPost
        } catch (err) {
            return { error: err.message }
        }
    }

    async deletePostById({ _id }) {
        try {
            const existingPost = await Post.findOne({ _id })
            if (existingPost) {
                const oldPost = await Post.deleteOne({ _id })

                return oldPost
            }

            return { error: 'Không tìm thấy bài viết!' }
        } catch (err) {
            return { error: err.message }
        }
    }
}

export default new PostRepository()
