import { Router } from "express";
import { Users } from "../dao/manager/usermana.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await Users.findAll(req.query);
    res.status(200).json({ message: "Users", users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/:idUser", async (req, res) => {
  const { idUser } = req.params;
  try {
  const user = await Users.findById(idUser);
  res.status(200).json({ message: "User", user });
} catch (err) {
  res.status(500).json({ error: err.message });
}
 });

router.get("/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const user = await Users.findByEmail(email);
    res.status(200).json({ message: "User", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.delete("/:idUser", async (req, res) => {
  const { idUser } = req.params;
  try {
    await Users.deleteOne(idUser);
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "Some data is missing" });
  }
  try {
    const createdUser = await Users.createOne(req.body);
    res.status(200).json({ message: "User created", user: createdUser });
    res.status(200).json({response:createdUser});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;