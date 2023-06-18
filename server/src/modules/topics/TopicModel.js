import { Schema, model } from 'mongoose'

const Topic = new Schema({
    corner: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String },
    totalPosts: { type: Number, default: 0 },
    postShow: {
        _id: { type: Schema.Types.ObjectId, required: true },
        imageUrl: { type: String, default: '' },
        username: { type: String, require: true },
        postBy: { type: String, require: true },
        title: { type: String, require: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

export default model('Topic', Topic)
