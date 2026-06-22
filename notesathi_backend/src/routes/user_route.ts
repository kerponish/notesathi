import { UserController } from "../controllers/user.controller";
import { Router } from "express";
import { upload } from "../middleware/upload.middleware";
import { authorizedMiddleware } from "../middleware/authorized.middleware";

const userController = new UserController();
const router = Router();

router.post(
  "/register",
  upload.single("profilePicture"),
  userController.createUser,
);
router.post("/login", userController.loginUser);
router.get("/whoami", authorizedMiddleware, userController.whoAmI);

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
router.patch(
  "/profile-picture",
  authorizedMiddleware,
  upload.single("profilePicture"),
  userController.updateProfilePicture,
);
router.delete(
  "/profile-picture",
  authorizedMiddleware,
  userController.deleteProfilePicture,
);

export default router;
