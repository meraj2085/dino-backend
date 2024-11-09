import cron from 'node-cron';
import { updateExpiredLeaves } from './updateExpiredLeaves';
import { updateDailyAttendance } from './updateDailyAttendance';

const expiredLeavesSchedules = [{ schedule: '* * * * *', utcTimeZone: '+06:00' }];

const cronJobs = () => {
  // Schedule cron job to update expired leaves every day at midnight
  cron.schedule('0 0 * * *', () => {
    updateExpiredLeaves().catch(err => console.error(err));
  });

  // Another corn job here
  expiredLeavesSchedules.forEach(({ schedule, utcTimeZone }) => {
    cron.schedule(schedule, () => {
      updateDailyAttendance(utcTimeZone).catch(err => console.error(err));
    });
  });
};

export default cronJobs;
