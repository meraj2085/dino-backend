import cron from 'node-cron';
import { updateExpiredLeaves } from './updateExpiredLeaves';
import { updateDailyAttendance } from './updateDailyAttendance';

const cronJobs = () => {
  // Update expired leaves every day at midnight
  cron.schedule('0 0 * * *', () => {
    updateExpiredLeaves().catch(err => console.error(err));
  });

  // Update daily attendance every minute
  cron.schedule('* * * * *', () => {
    updateDailyAttendance().catch(err => console.error(err));
  });
};

export default cronJobs;
