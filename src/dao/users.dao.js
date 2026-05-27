import User from "../models/user.model.js";

const getAll = () => User.find();
const getById = (id) => User.findById();
const create = (data) => User.create();
const insertMany = (data) => User.insertMany(data);

export default { getAll, getById, create, insertMany };
