import { Appointment } from '../appointment/appointment.model';
import { attendance } from '../attendance/attendance.model';
import { Event } from '../event/event.model';
import { Leave } from '../leave/leave.model';
import { Organization } from '../organization/organization.model';
import { User } from '../user/user.model';
import {
  IAdminStats,
  IEmployeeStats,
  ISuperAdminStats,
} from './statistics.interface';

const getSuperAdminStats = async (): Promise<ISuperAdminStats | null> => {
  const organizations = await Organization.countDocuments();
  const adminUsers = await User.countDocuments({ user_type: 'admin' });
  const employees = await User.countDocuments({ user_type: 'employee' });
  const bookings = await Appointment.countDocuments();

  const employeesByGender = await User.aggregate([
    { $match: { user_type: 'employee' } },
    {
      $group: {
        _id: '$gender',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        name: '$_id',
        value: '$count',
      },
    },
  ]);

  const activeEmployees = await attendance.aggregate([
    {
      $match: {
        is_checkout: true,
      },
    },
    {
      $group: {
        _id: '$date',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        date: '$_id',
        count: 1,
      },
    },
    {
      $sort: {
        date: 1,
      },
    },
  ]);

  const activeByDate = activeEmployees.map(
    (employee: { date: string; count: number }) => ({
      date: employee.date,
      count: employee.count,
    })
  );

  return {
    organizations,
    adminUsers,
    employees,
    bookings,
    employeesByGender,
    activeByDate,
  };
};

const getAdminStats = async (
  organization_id: string
): Promise<IAdminStats | null> => {
  const employees = await User.countDocuments({
    organization_id,
    user_type: 'employee',
  });
  const leaves = await Leave.countDocuments({ organization_id });
  const events = await Event.countDocuments({ organization_id });
  const attend = await attendance.countDocuments({ organization_id });

  const employeesByGender = await User.aggregate([
    { $match: { organization_id, user_type: 'employee' } },
    {
      $group: {
        _id: '$gender',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        name: '$_id',
        value: '$count',
      },
    },
  ]);

  const activeEmployees = await attendance.aggregate([
    {
      $match: {
        is_checkout: true,
        organization_id,
      },
    },
    {
      $group: {
        _id: '$date',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        date: '$_id',
        count: 1,
      },
    },
    {
      $sort: {
        date: 1,
      },
    },
  ]);

  const activeByDate = activeEmployees.map(
    (employee: { date: string; count: number }) => ({
      date: employee.date,
      count: employee.count,
    })
  );

  // console.log(activeByData);

  return {
    employees,
    leaves,
    events,
    attendance: attend,
    employeesByGender,
    activeByDate,
  };
};

const getEmployeeStats = async (
  user_id: string,
  organization_id: string
): Promise<IEmployeeStats | null> => {
  const user = await User.findOne({
    _id: user_id,
  });
  // console.log(user);

  let manager_id: string | undefined;
  if (user?.role === 'Manager') {
    manager_id = user_id;
  } else {
    manager_id = user?.manager_id;
  }

  const empAttendance = await attendance.countDocuments({
    user_id,
    organization_id,
  });
  const leaves = await Leave.countDocuments({ user_id, organization_id });
  const myTeam = await User.countDocuments({
    organization_id,
    $or: [
      {
        manager_id,
      },
      {
        _id: manager_id,
      },
    ],
  });

  const upcomingEvents = await Event.countDocuments({
    organization_id,
    from_date: { $gte: new Date().toISOString() },
  });

  return {
    attendance: empAttendance,
    leaves,
    myTeam,
    upcomingEvents,
  };
};

export const StatisticsService = {
  getSuperAdminStats,
  getAdminStats,
  getEmployeeStats,
};
