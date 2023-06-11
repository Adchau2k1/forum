import User from './UserModel.js'
import bcrypt from 'bcrypt'

class UserRepository {
    async getUserAll({ page, pageSize, isAll }) {
        try {
            const userAll = await User.find()

            page = parseInt(page)
            pageSize = parseInt(pageSize)

            let filteredUsers
            if (!isAll) {
                filteredUsers = await User.aggregate([
                    {
                        $match: {},
                    },
                    {
                        $skip: (page - 1) * pageSize,
                    },
                    { $limit: pageSize },
                ])
            } else filteredUsers = userAll

            if (filteredUsers) {
                filteredUsers.total = userAll.length
                return filteredUsers
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
            username = username.toLowerCase()
            const existingUsername = await User.findOne({ username })
            const existingUserMail = await User.findOne({ email })
            if (existingUsername) {
                return { error: 'Tài khoản đã tồn tại!' }
            }
            if (existingUserMail) {
                return { error: 'Email đã tồn tại!' }
            }

            const passwordHashed = await bcrypt.hash(
                password,
                parseInt(process.env.PASSWORD_SALT_ROUNDS)
            )
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

    async updateUser({
        _id,
        email,
        password,
        checked,
        fullName,
        phone,
        image_url,
        userPosts,
        userLikes,
    }) {
        try {
            const existingUser = await User.findById(_id)
            if (!existingUser) {
                return { error: 'Tài khoản không tồn tại!' }
            }

            let passwordHashed
            if (password)
                passwordHashed = await bcrypt.hash(
                    password,
                    parseInt(process.env.PASSWORD_SALT_ROUNDS)
                )

            const updatedAt = new Date()
            const newUser = await User.updateOne(
                { _id: _id },
                {
                    email,
                    password: passwordHashed,
                    checked,
                    fullName,
                    phone,
                    image_url,
                    userPosts,
                    userLikes,
                    updatedAt,
                }
            )

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

export default new UserRepository()
