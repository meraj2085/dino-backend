/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ILeave } from './leave.interface';
import { Leave } from './leave.model';

const addLeave = async (data: ILeave): Promise<ILeave | null> => {
  const toDate: any = new Date(data.to_date);
  const fromDate: any = new Date(data.from_date);

  const timeDifference = toDate - fromDate;
  const NumberOfDate = timeDifference / (1000 * 60 * 60 * 24);
  const days: any = NumberOfDate.toFixed();
  if (days < 0) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Please select right feature date'
    );
  }

  const leaveData = {
    leave_type: data.leave_type,
    reason: data.reason,
    from_date: data.from_date,
    to_date: data.to_date,
    user_id: data.user_id,
    organization_id: data.organization_id,
    no_of_days: days,
  };
  const result = await Leave.create(leaveData);
  return result;
};

export const LeaveService = {
  addLeave,
};
