import { Router } from "express";
import verifyToken from "../middlewares/authMiddleware.js";

const userRoutes = Router();

// only admin can access
userRoutes.get("/admin", verifyToken, (req, res) => {
  res.json({message: "Welcome Admin!"})
})

// both admin and manager can access
userRoutes.get("/manager", verifyToken, (req, res) => {
  res.json({ message: "Welcome Manager!" });
});


// all users can access
userRoutes.get("/user", verifyToken, (req, res) => {
  res.json({ message: "Welcome User!" });
});

export default userRoutes;