import supertest from "supertest";
import { expect } from "chai";
import app from "../app.js";

const requester = supertest(app);

describe("Adoption Router - Tests funcionales", () => {
  describe("GET /api/adoptions", () => {
    it("debe retornar status 200 y un array", async () => {
      const res = await requester.get("/api/adoptions");
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("status", "success");
      expect(res.body.payload).to.be.an("array");
    });
  });

  describe("GET /api/adoptions/:aid", () => {
    it("debe retornar 404 con un ID inexistente", async () => {
      const res = await requester.get(
        "/api/adoptions/000000000000000000000000",
      );
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("status", "error");
    });

    it("debe retornar 500 con un ID con formato inválido", async () => {
      const res = await requester.get("/api/adoptions/id-invalido");
      expect(res.status).to.equal(500);
      expect(res.body).to.have.property("status", "error");
    });
  });

  describe("POST /api/adoptions/:uid/:pid", () => {
    it("debe retornar 404 si el usuario no existe", async () => {
      const res = await requester.post(
        "/api/adoptions/000000000000000000000000/000000000000000000000001",
      );
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("status", "error");
      expect(res.body.message).to.equal("Usuario no encontrado.");
    });

    it("debe retornar 404 si la mascota no existe", async () => {
      const userRes = await requester.post("/api/mocks/generateData").send({
        users: 1,
        pets: 0,
      });
      const userId = userRes.body.payload.users[0]._id;

      const res = await requester.post(
        `/api/adoptions/${userId}/000000000000000000000001`,
      );
      expect(res.status).to.equal(404);
      expect(res.body.message).to.equal("Mascota no encontrada.");
    });

    it("debe adoptar correctamente y retornar 200", async () => {
      const dataRes = await requester.post("/api/mocks/generateData").send({
        users: 1,
        pets: 1,
      });
      const userId = dataRes.body.payload.users[0]._id;
      const petId = dataRes.body.payload.pets[0]._id;

      const petsRes = await requester.get("/api/pets");
      const pet = petsRes.body.payload.find((p) => p._id === petId);
      if (pet && pet.adopted) {
        return;
      }

      const res = await requester.post(`/api/adoptions/${userId}/${petId}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("status", "success");
      expect(res.body.payload.pet.adopted).to.equal(true);
      expect(String(res.body.payload.pet.owner)).to.equal(String(userId));
    });

    it("debe retornar 400 si la mascota ya fue adoptada", async () => {
      // Generamos datos y adoptamos primero
      const dataRes = await requester.post("/api/mocks/generateData").send({
        users: 1,
        pets: 1,
      });
      const userId = dataRes.body.payload.users[0]._id;
      const petId = dataRes.body.payload.pets[0]._id;

      // Primera adopción exitosa
      await requester.post(`/api/adoptions/${userId}/${petId}`);

      // Segunda adopción — debe fallar
      const res = await requester.post(`/api/adoptions/${userId}/${petId}`);
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal("La mascota ya fue adoptada.");
    });
  });
});
