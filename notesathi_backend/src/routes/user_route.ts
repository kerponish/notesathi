import { UserController } from "../controllers/user.controller";
import { Router } from "express";
import { upload } from "../middleware/upload.middleware";
import { authorizedMiddleware } from "../middleware/authorized.middleware";

const userController = new UserController();
const router = Router();

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/google", userController.googleAuth);
router.get("/whoami", authorizedMiddleware, userController.whoAmI);

router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);

router.patch(
  "/change-password",
  authorizedMiddleware,
  userController.changePassword,
);

router.patch(
  "/update",
  authorizedMiddleware,
  upload.single("profilePicture"),
  userController.updateProfile,
);
router.get("/profile", authorizedMiddleware, userController.getProfile);
router.patch("/profile", authorizedMiddleware, userController.updateProfile);

export default router;
