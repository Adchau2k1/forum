import { Schema, model } from 'mongoose'

const User = new Schema({
    username: { type: String, require: true, minLength: 6, maxLength: 12 },
    email: { type: String, require: true },
    password: { type: String, require: true },
    phone: { type: String, default: '' },
    checked: { type: Boolean, default: false },
    fullName: { type: String, require: true, maxLength: 24 },
    imageUrl: { type: String, default: '' },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
})

export default model('User', User)
