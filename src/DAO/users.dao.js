import {userModel} from '../models/user.models.js';

export default class UsersDAO {

    async getAll() {
        return await userModel.find()
    }

    async getById(id) {
        return await userModel.findById(id)
    }
}