import { Schema, model } from 'mongoose'

const User = new Schema({
    username: { type: String, required: true, minLength: 6, maxLength: 12 },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'member' },
    phone: { type: String, default: '' },
    checked: { type: Boolean, default: false },
    fullName: { type: String, required: true, maxLength: 24 },
    imageUrl: { type: String, default: '' },
    totalLikes: { type: Number, default: 0 },
    totalPosts: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

export default model('User', User)
