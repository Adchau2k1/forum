import { Schema, model } from 'mongoose'

const Topic = new Schema({
    username: { type: String, minLength: 6, maxLength: 12 },
    password: String,
    checked: Boolean,
    email: String,
    fullName: { type: String, maxLength: 24 },
    imageUrl: String,
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
})

export default model('Topic', Topic)
