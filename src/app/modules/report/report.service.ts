// import { formatSecondToTime } from '../../../utils/common';
// import { attendance } from '../attendance/attendance.model';
// import { User } from '../user/user.model';

// const getAttendanceReport = async (
//   user_ids: string[] | undefined,
//   monthYear: string,
//   organization_id: string
// ) => {
//   if (!monthYear || !organization_id) {
//     throw new Error('monthYear and organization_id are required');
//   }

//   const [year, month] = monthYear.split('-').map(Number);
//   const startDate = new Date(Date.UTC(year, month - 1, 1));
//   const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));

//   // Fetch all users in the organization if user_ids is empty
//   let users = [];
//   if (!user_ids || user_ids.length === 0) {
//     users = await User.find({ organization_id })
//       .select(['_id', 'first_name', 'last_name'])
//       .lean();
//     user_ids = users.map(user => user._id.toString()); // Extract user IDs
//   } else {
//     users = await User.find({ _id: { $in: user_ids } })
//       .select(['_id', 'first_name', 'last_name'])
//       .lean();
//   }

//   const userMap = users.reduce((acc, user) => {
//     acc[user._id.toString()] = `${user.first_name} ${user.last_name}`;
//     return acc;
//   }, {} as Record<string, string>);

//   // Fetch attendance records for the given users
//   const attendanceRecords = await attendance
//     .find({
//       organization_id,
//       user_id: { $in: user_ids },
//       date: { $gte: startDate.toISOString(), $lte: endDate.toISOString() },
//     })
//     .select(['user_id', 'production', 'break', 'overtime', 'date', '-_id'])
//     .lean();

//   const groupedAttendance = user_ids.map(user_id => {
//     const userFullName = userMap[user_id] || 'Unknown User';
//     const reports = attendanceRecords
//       .filter(record => record.user_id.toString() === user_id)
//       .map(record => ({
//         date: record.date,
//         production: formatSecondToTime(Number(record.production) || 0),
//         overtime: formatSecondToTime(Number(record.overtime) || 0),
//         break: formatSecondToTime(Number(record.break) || 0),
//       }));

//     return {
//       user_id,
//       'Full name': userFullName,
//       report: reports,
//     };
//   });

//   return groupedAttendance;
// };

// export const ReportService = {
//   getAttendanceReport,
// };

import { formatSecondToTime } from '../../../utils/common';
import { attendance } from '../attendance/attendance.model';
import { User } from '../user/user.model';

const getAttendanceReport = async (
  user_ids: string[] | undefined,
  monthYear: string,
  organization_id: string
) => {
  if (!monthYear || !organization_id) {
    throw new Error('monthYear and organization_id are required');
  }

  const [year, month] = monthYear.split('-').map(Number);
  const startDate = new Date(Date.UTC(year, month - 1, 1));
  const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));

  // Fetch all users in the organization if user_ids is empty
  let users = [];
  if (!user_ids || user_ids.length === 0) {
    users = await User.find({ organization_id })
      .select(['_id', 'first_name', 'last_name'])
      .lean();
    user_ids = users.map(user => user._id.toString()); // Extract user IDs
  } else {
    users = await User.find({ _id: { $in: user_ids } })
      .select(['_id', 'first_name', 'last_name'])
      .lean();
  }

  // Create a user map for quick lookup
  const userMap = users.reduce((acc, user) => {
    acc[user._id.toString()] = `${user.first_name} ${user.last_name}`;
    return acc;
  }, {} as Record<string, string>);

  // Fetch attendance records for the given users
  const attendanceRecords = await attendance
    .find({
      organization_id,
      user_id: { $in: user_ids },
      date: { $gte: startDate.toISOString(), $lte: endDate.toISOString() },
    })
    .select(['user_id', 'production', 'break', 'overtime', 'date', '-_id'])
    .lean();

  // Group attendance records by user ID
  const attendanceMap = attendanceRecords.reduce((acc, record) => {
    const userId = record.user_id.toString();

    if (!acc[userId]) {
      acc[userId] = [];
    }

    acc[userId].push({
      date: record.date,
      production: formatSecondToTime(Number(record.production) || 0),
      overtime: formatSecondToTime(Number(record.overtime) || 0),
      break: formatSecondToTime(Number(record.break) || 0),
    });

    return acc;
  }, {} as Record<string, { date: string; production: string; overtime: string; break: string }[]>);

  // Generate the final report ensuring every user is included
  const report = users.map(user => ({
    user_id: user._id.toString(),
    'Full name': userMap[user._id.toString()] || 'Unknown User',
    report: attendanceMap[user._id.toString()] || [], // Ensure an empty array if no attendance records
  }));

  return report;
};

export const ReportService = {
  getAttendanceReport,
};
