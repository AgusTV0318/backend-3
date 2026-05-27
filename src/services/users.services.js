import usersDao from "../dao/users.dao.js";

const getAll = () => usersDao.getAll();
const getById = (id) => usersDao.getById(id);
const create = (data) => usersDao.create(data);
const insertMany = (data) => usersDao.insertMany(data);

export default { getAll, getById, create, insertMany };
