import Notification, { INotification } from "../models/notification_model";

export interface INotificationRepository {
  create(data: {
    userId: string;
    fromUserId: string;
    type: "like" | "comment";
    noteId: string;
  }): Promise<INotification>;
  findByUser(userId: string): Promise<INotification[]>;
  markAsRead(id: string, userId: string): Promise<INotification | null>;
  markAllAsRead(userId: string): Promise<void>;
  countUnread(userId: string): Promise<number>;
}

export class NotificationMongoRepository implements INotificationRepository {
  async create(data: {
    userId: string;
    fromUserId: string;
    type: "like" | "comment";
    noteId: string;
  }): Promise<INotification> {
    return await Notification.create(data);
  }

  async findByUser(userId: string): Promise<INotification[]> {
    return await Notification.find({ userId })
      .populate("fromUserId", "fullname email profilePicture")
      .populate("noteId", "title")
      .sort({ createdAt: -1 })
      .limit(50);
  }

  async markAsRead(id: string, userId: string): Promise<INotification | null> {
    return await Notification.findOneAndUpdate(
      { _id: id, userId },
      { read: true },
      { new: true },
    );
  }

  async markAllAsRead(userId: string): Promise<void> {
    await Notification.updateMany({ userId, read: false }, { read: true });
  }

  async countUnread(userId: string): Promise<number> {
    return await Notification.countDocuments({ userId, read: false });
  }
}
