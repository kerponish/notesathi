import { Request, Response } from "express";
import { NotificationService } from "../services/notification_service";

const notificationService = new NotificationService();

export class NotificationController {
  async getNotifications(req: Request, res: Response) {
    const userId = (req as any).user.id;

    const { notifications, unreadCount } =
      await notificationService.getNotifications(userId);

    res.status(200).json({
      success: true,
      data: notifications,
      unreadCount,
    });
  }

  async markAsRead(req: Request, res: Response) {
    const userId = (req as any).user.id;

    const notification = await notificationService.markAsRead(
      req.params.id as string,
      userId,
    );

    res.status(200).json({
      success: true,
      data: notification,
    });
  }

  async markAllAsRead(req: Request, res: Response) {
    const userId = (req as any).user.id;

    const result = await notificationService.markAllAsRead(userId);

    res.status(200).json({
      success: true,
      ...result,
    });
  }
}
