import { Router } from "express";
import petsService from "../services/pets.services.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const pets = await petsService.getAll();
    res.json({ status: "success", payload: pets });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const pet = await petsService.getById(req.params.pid);
    if (!pet)
      return res
        .status(404)
        .json({ status: "error", message: "Mascota no encontrada." });
    res.json({ status: "success", payload: pet });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default router;
