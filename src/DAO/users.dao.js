import {userModel} from '../models/user.models.js';

export default class UsersDAO {
    async getAll() {
        return await userModel.find()
    }

    async getById(id) {
        return await userModel.findById(id)
    }

    async createUser(userData) {
        return await userModel.create(userData)
    }

    async updateUser(id,updateData) {
        return await userModel.findByIdAndUpdate(id,updateData,{new: true})
    }

    async deleteUser(id) {
        return await userModel.deleteOne({_id: id})
    }
}