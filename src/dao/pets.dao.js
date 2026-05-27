import Pet from "../models/pet.model.js";

const getAll = () => Pet.find();
const getById = (id) => Pet.findById(id);
const create = (data) => Pet.create(data);
const insertMany = (data) => Pet.insertMany(data);

export default { getAll, getById, create, insertMany };
