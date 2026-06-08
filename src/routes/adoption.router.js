import { Router } from "express";
import usersServices from "../services/users.services";
import petsServices from "../services/pets.services";

const router = router();

router.get("/", async (req, res) => {
  try {
    const users = await usersServices.getAll();
    const adoptions = users.filters((u) => u.pets.length > 0);
    res.json({ status: "success", payload: adoptions });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.get("/:aid", async (req, res) => {
  try {
    const user = await usersServices.getById(req.params.aid);
    if (!user)
      return res
        .status(404)
        .json({ status: "error", message: "Usuario no encontrado." });
    if (user.pets.length === 0)
      return res
        .status(404)
        .json({ status: "error", message: "El usuario no tiene adopciones." });
    res.json({ status: "success", payload: user });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.post("/:uid/:pid", async (req, res) => {
  try {
    const user = await usersServices.getById(req.params.uid);
    if (!user)
      return res
        .status(404)
        .json({ status: "error", message: "Usuario no encontrada." });

    const pet = await petsService.getById(req.params.pid);
    if (!pet)
      return res
        .status(404)
        .json({ status: "error", message: "Mascota no encontrada." });

    if (pet.adopted)
      return res
        .status(400)
        .json({ status: "error", message: "La mascota ya fue adoptada" });

    user.pets.push(pet._id);
    await user.save();

    pet.adopted = true;
    pet.owner = user._id;
    await pet.save();

    res.json({
      status: "success",
      message: `${user.first_name} adopto a ${pet.name} exitosamente.`,
      payload: { user, pet },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default router;
