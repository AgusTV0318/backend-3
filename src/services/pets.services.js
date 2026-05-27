import petsDao from "../dao/pets.dao.js";

const getAll = () => petsDao.getAll();
const getById = (id) => petsDao.getById(id);
const create = (data) => petsDao.create(data);
const insertMany = (data) => petsDao.insertMany(data);

export default { getAll, getById, create, insertMany };
