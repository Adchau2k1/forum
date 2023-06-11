import { Schema, model } from 'mongoose'

const Topic = new Schema({
    corner: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String },
    totalPosts: { type: Number, default: 0 },
    postShowId: { type: Schema.Types.ObjectId, required: true },
})

export default model('Topic', Topic)
