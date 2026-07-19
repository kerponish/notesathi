import { NotificationMongoRepository } from "../repositories/notification_repository";
import { HttpException } from "../exceptions/http-exception";

const notificationRepository = new NotificationMongoRepository();

export class NotificationService {
  async notify(data: {
    userId: string;
    fromUserId: string;
    type: "like" | "comment";
    noteId: string;
  }) {
    // never notify a user about their own activity on their own note
    if (data.userId === data.fromUserId) {
      return null;
    }
    return await notificationRepository.create(data);
  }

  async getNotifications(userId: string) {
    const [notifications, unreadCount] = await Promise.all([
      notificationRepository.findByUser(userId),
      notificationRepository.countUnread(userId),
    ]);
    return { notifications, unreadCount };
  }

  async markAsRead(id: string, userId: string) {
    const notification = await notificationRepository.markAsRead(id, userId);
    if (!notification) {
      throw new HttpException(404, "Notification not found");
    }
    return notification;
  }

  async markAllAsRead(userId: string) {
    await notificationRepository.markAllAsRead(userId);
    return { message: "All notifications marked as read" };
  }
}
