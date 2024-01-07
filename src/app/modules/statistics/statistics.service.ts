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

  return {
    organizations,
    adminUsers,
    employees,
    bookings,
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

  return {
    employees,
    leaves,
    events,
    attendance: attend,
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
  const teamSize = await User.countDocuments({
    manager_id: user_id,
  });
  // if there is no one under his team then set manager_id to his manager_id
  if (teamSize === 0) {
    manager_id = user?.manager_id;
  } else {
    manager_id = user_id;
  }
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
