import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import mocksRouter from "./routes/mocks.router.js";
import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionRouter from "./routes/adoption.router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/backend3";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/mocks", mocksRouter);
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionRouter);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("✅ Conectado a MongoDB");
    app.listen(PORT, () =>
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`),
    );
  })
  .catch((err) => {
    console.error("❌ Error al conectar MongoDB:", err.message);
    process.exit(1);
  });

export default app;
