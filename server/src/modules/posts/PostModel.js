import { Schema, model } from 'mongoose'

const Post = new Schema({
    topicId: { type: Schema.Types.ObjectId, required: true },
    userPostId: { type: Schema.Types.ObjectId, required: true },
    postBy: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    userPosts: { type: Number, default: 0 },
    userLikes: { type: Number, default: 0 },
    totalLikes: { type: Number, default: 0 },
    comments: {
        total: { type: Number, default: 0 },
        data: {
            type: [
                {
                    _id: { type: String, required: true },
                    imageUrl: { type: String, default: '' },
                    userCommentId: { type: String, require: true },
                    commentBy: { type: String, require: true },
                    content: { type: String, require: true },
                    userLikes: { type: Number, default: 0 },
                    totalLikes: { type: Number, default: 0 },
                    createdAt: { type: Date, default: new Date() },
                    updatedAt: { type: Date, default: new Date() },
                },
            ],
        },
    },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
})

export default model('Post', Post)
