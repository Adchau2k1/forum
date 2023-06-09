import User from './UserModel.js'
import bcrypt from 'bcrypt'

export default class UserRepository {
    async getUserAll({ page, pageSize }) {
        try {
            const existingUser = await User.find()
            if (existingUser) {
                return existingUser
            }

            return { error: 'Không có dữ liệu!' }
        } catch (err) {
            return { error: err.message }
        }
    }

    async getUserById(_id) {
        try {
            const existingUser = await User.findById(_id)
            if (existingUser) {
                return existingUser
            }

            return { error: 'Không tìm thấy user!' }
        } catch (err) {
            return { error: err.message }
        }
    }

    async loginUser({ username, password }) {
        try {
            const existingUser = await User.findOne({ username })
            if (existingUser) {
                const isMatched = await bcrypt.compare(password, existingUser.password)
                if (isMatched) {
                    // Create JWT token
                    return existingUser
                }

                return { error: 'Tài khoản hoặc mật khẩu không chính xác!' }
            }

            return { error: 'Tài khoản hoặc mật khẩu không chính xác!' }
        } catch (err) {
            return { error: err.message }
        }
    }

    async createUser({ username, email, password }) {
        try {
            const existingUser = await User.findOne({ username })
            if (existingUser) {
                return { error: 'Tài khoản đã tồn tại!' }
            }

            const passwordHashed = await bcrypt.hash(password, 9)
            const newUser = await User.create({
                username,
                email,
                password: passwordHashed,
                fullName: username,
            })

            return newUser
        } catch (err) {
            return { error: err.message }
        }
    }

    async deleteUserById({ _id }) {
        try {
            const existingUser = await User.findOne({ _id })
            if (existingUser) {
                const oldUser = await User.deleteOne({ _id })

                return oldUser
            }

            return { error: 'Không tìm thấy tài khoản!' }
        } catch (err) {
            return { error: err.message }
        }
    }
}
