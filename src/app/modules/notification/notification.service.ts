/* eslint-disable prefer-const */
import { sendMail } from '../../../utils/sendMail';
import { User } from '../user/user.model';

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
    // send push notification
    // coming soon
  }

  return true;
};

export const NotificationService = {
  sendNotification,
};
