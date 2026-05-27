import { Router } from "express";
import { generateUsers, generatePets } from "../modules/mocking.js";
import usersService from "../services/users.services.js";
import petsService from "../services/pets.services.js";

const router = Router();

router.get("/mockingpets", (req, res) => {
  const pets = generatePets(50);
  res.json({ status: "success", payload: pets });
});

router.get("/mockingusers", (req, res) => {
  const users = generateUsers(50);
  res.json({ status: "success", payload: users });
});

router.post("/generateData", async (req, res) => {
  try {
    const { users = 0, pets = 0 } = req.body;

    const usersQty = parseInt(users);
    const petsQty = parseInt(pets);

    if (isNaN(usersQty) || isNaN(petsQty) || usersQty < 0 || petsQty < 0) {
      return res.status(400).json({
        status: "error",
        message: "Los parámetros 'users' y 'pets' deben ser números positivos.",
      });
    }

    // Generar datos mockeados (sin _id para que Mongo los asigne)
    const mockUsers = generateUsers(usersQty).map(({ _id, __v, ...u }) => u);
    const mockPets = generatePets(petsQty).map(({ _id, __v, ...p }) => p);

    // Insertar en DB (solo si hay registros a insertar)
    const insertedUsers =
      usersQty > 0 ? await usersService.insertMany(mockUsers) : [];
    const insertedPets =
      petsQty > 0 ? await petsService.insertMany(mockPets) : [];

    res.status(201).json({
      status: "success",
      message: `Se insertaron ${insertedUsers.length} usuarios y ${insertedPets.length} mascotas.`,
      payload: {
        users: insertedUsers,
        pets: insertedPets,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default router;
