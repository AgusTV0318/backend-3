import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

// Contraseña fija encriptada: "coder123"
const HASHED_PASSWORD = bcrypt.hashSync("coder123", 10);

export const generateUser = () => ({
  _id: faker.database.mongodbObjectId(),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  email: faker.internet.email().toLowerCase(),
  password: HASHED_PASSWORD,
  role: faker.helpers.arrayElement(["user", "admin"]),
  pets: [],
  __v: 0,
});

export const generatePet = () => ({
  _id: faker.database.mongodbObjectId(),
  name: faker.animal.petName(),
  specie: faker.helpers.arrayElement([
    "dog",
    "cat",
    "rabbit",
    "bird",
    "hamster",
  ]),
  adopted: false,
  owner: null,
  image: faker.image.urlPicsumPhotos({ width: 200, height: 200 }),
  __v: 0,
});

export const generateUsers = (n = 50) =>
  Array.from({ length: n }, generateUser);

export const generatePets = (n = 50) => Array.from({ length: n }, generatePet);
