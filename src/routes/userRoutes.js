import { Router } from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import authorizeRole from "../middlewares/roleMiddleware.js";

const userRoutes = Router();

// only admin can access
userRoutes.get("/admin", verifyToken, authorizeRole("admin"), (req, res) => {
  res.json({message: "Welcome Admin!"})
})

// both admin and manager can access
userRoutes.get("/manager", verifyToken, authorizeRole("admin, manager"), (req, res) => {
  res.json({ message: "Welcome Manager!" });
});


// all users can access
userRoutes.get("/user", verifyToken, authorizeRole("admin, manager, user"), (req, res) => {
  res.json({ message: "Welcome User!" });
});

export default userRoutes;