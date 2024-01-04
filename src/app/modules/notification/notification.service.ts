/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { sendMail } from '../../../utils/sendMail';
import { User } from '../user/user.model';
import { INotification } from './notification.interface';
import { Notification } from './notification.model';

const sendNotification = async (data: any) => {
  let {
    title,
    description,
    user_ids,
    sendPush = false,
    sendEmail = false,
    department,
    toAll,
    organization_id,
  } = data;

  let users: any = [];

  if (toAll) {
    users = await User?.find({
      status: 'Active',
      user_type: { $ne: 'super_admin' },
      organization_id,
    });
    user_ids = users?.map((item: any) => item?._id);
  } else if (department) {
    users = await User?.find({
      status: 'Active',
      department,
      organization_id,
    });
    user_ids = users?.map((item: any) => item?._id);
  } else if (user_ids) {
    users = await User?.find({
      _id: { $in: user_ids },
    });
  }

  if (sendEmail) {
    await Promise.all(
      users?.map(async (item: any) => {
        await sendMail({
          to: item?.office_email,
          subject: title,
          message: description,
        });
      })
    );
  }

  if (sendPush) {
    await Notification.create({
      title: title,
      description: description,
      organization_id: organization_id,
      user_ids: user_ids,
    });
  }

  return true;
};

const getNotification = async (id: string): Promise<INotification[] | null> => {
  const notifications = await Notification.find({
    user_ids: { $in: [id] },
  }).sort({ createdAt: -1 });
  return notifications;
};

const getUnreadCount = async (id: string): Promise<number> => {
  const notifications = await Notification.find({
    user_ids: { $in: [id] },
    read_by: { $nin: [id] },
  }).count();
  return notifications;
};

const deleteMyNotification = async (id: string) => {
  const notifications = await Notification.updateMany(
    {
      user_ids: { $in: [id] },
    },
    {
      $pull: { user_ids: id },
    }
  );
  return notifications;
};

const markRead = async (id: string, notificationId: string) => {
  const notification = await Notification.updateMany(
    {
      _id: notificationId,
    },
    {
      $addToSet: { read_by: id },
    }
  );
  return notification;
};

export const NotificationService = {
  sendNotification,
  getNotification,
  getUnreadCount,
  deleteMyNotification,
  markRead,
};
