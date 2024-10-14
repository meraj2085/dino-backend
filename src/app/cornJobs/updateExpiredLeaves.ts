import { Leave } from '../modules/leave/leave.model';

export const updateExpiredLeaves = async () => {
  try {
    const currentDate = new Date();

    await Leave.updateMany(
      {
        to_date: { $lt: currentDate.toISOString().split('T')[0] },
        status: {
          $nin: ['Expired', 'Accepted', 'Rejected', 'Cancelled'],
          $eq: 'Applied',
        },
      },
      {
        $set: { status: 'Expired' },
      }
    );

    console.log('Expired leaves updated successfully.');
  } catch (error) {
    console.error('Error updating expired leaves:', error);
  }
};
