import { Router } from "express";
import usersService from "../services/users.services.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await usersService.getAll();
    res.json({ status: "success", payload: users });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.get("/:uid", async (req, res) => {
  try {
    const user = await usersService.getById(req.params.uid);
    if (!user)
      return res
        .status(404)
        .json({ status: "error", message: "Usuario no encontrado." });
    res.json({ status: "success", payload: user });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default router;
