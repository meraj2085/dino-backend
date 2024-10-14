import cron from 'node-cron';
import { updateExpiredLeaves } from './updateExpiredLeaves';

const cronJobs = () => {
  // Schedule cron job to update expired leaves every day at midnight
  cron.schedule('0 0 * * *', () => {
    updateExpiredLeaves().catch(err => console.error(err));
  });

  // Another corn job here
};

export default cronJobs;
