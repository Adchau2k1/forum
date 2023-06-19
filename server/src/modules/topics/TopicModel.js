import { Schema, model } from 'mongoose'

const Topic = new Schema({
    corner: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, default: '' },
    totalPosts: { type: Number, default: 0 },
    postShow: {
        _id: { type: Schema.Types.ObjectId },
        imageUrl: { type: String },
        username: { type: String },
        postBy: { type: String },
        title: { type: String },
        createdAt: { type: Date },
        updatedAt: { type: Date },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

export default model('Topic', Topic)
