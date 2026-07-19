import { Router } from "express";
import { NotificationController } from "../controllers/notification.controller";
import { authorizedMiddleware } from "../middleware/authorized.middleware";

const router = Router();
const notificationController = new NotificationController();

router.get("/", authorizedMiddleware, notificationController.getNotifications);

router.patch(
  "/read-all",
  authorizedMiddleware,
  notificationController.markAllAsRead,
);

router.patch(
  "/:id/read",
  authorizedMiddleware,
  notificationController.markAsRead,
);

export default router;
