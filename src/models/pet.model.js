import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specie: { type: String, required: true },
  adopted: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  image: { type: String, default: "" },
});

const pet = mongoose.model("Pet", petSchema);
export default pet;
