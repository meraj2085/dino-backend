/* eslint-disable prefer-const */
import { sendMail } from '../../../utils/sendMail';
import { User } from '../user/user.model';
import { INotification } from './notification.interface';
import { notification } from './notification.model';

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

  // Get today's date
  const today = new Date();

  // Add 5 days to today's date
  const afterFiveDays = new Date(today);
  afterFiveDays.setDate(today.getDate() + 5);

  // Format the result (optional)
  const formattedDate = afterFiveDays.toISOString().split('T')[0];

  if (sendPush) {
    await notification.create({
      title: title,
      description: description,
      organization_id: organization_id,
      user_ids: user_ids,
      delete_at: formattedDate,
    });
  }

  return true;
};

const getNotification = async (
  organization_id: string
): Promise<INotification[] | null> => {
  const notifications = await notification.find({ organization_id });
  return notifications;
};

export const NotificationService = {
  sendNotification,
  getNotification,
};
