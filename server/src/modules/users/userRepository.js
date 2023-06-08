import User from './UserModel.js'

class UserRepository {
    async getUserAll({ page, pageSize, ...props }) {
        return await User.find()
    }

    async getUserById(id) {
        return await User.findById(id)
    }
}

export default new UserRepository()
