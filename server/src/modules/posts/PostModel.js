import { Schema, model } from 'mongoose'

const Post = new Schema({
    topicId: { type: Schema.Types.ObjectId, required: true },
    imageUrl: { type: String, default: '' },
    userPostId: { type: Schema.Types.ObjectId, required: true },
    usernamePost: { type: String, required: true },
    postBy: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    topicTitle: { type: String, required: true },
    totalPosts: { type: Number, require: 0 },
    totalLikes: { type: Number, require: 0 },
    likedList: { type: Array, default: [] },
    comments: {
        total: { type: Number, default: 0 },
        data: {
            type: [
                {
                    _id: { type: String, required: true },
                    imageUrl: { type: String, default: '' },
                    username: { type: String, require: true },
                    userCommentId: { type: Schema.Types.ObjectId, required: true },
                    commentBy: { type: String, require: true },
                    content: { type: String, require: true },
                    totalPosts: { type: Number, default: 0 },
                    totalLikes: { type: Number, require: 0 },
                    likedList: { type: Array, default: [] },
                    createdAt: { type: Date, default: Date.now },
                    updatedAt: { type: Date, default: Date.now },
                },
            ],
        },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

export default model('Post', Post)
