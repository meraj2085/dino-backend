import { attendance } from '../modules/attendance/attendance.model';
import { Organization } from '../modules/organization/organization.model';

const formatTime = (seconds: any) => {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const remainingSeconds = String(seconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${remainingSeconds}`;
};

export const updateDailyAttendance = async (utcTimeZone: string) => {
  try {
    const orgs = await Organization.find({
      utc_offset: utcTimeZone,
      status: 'Active',
    }).select(['_id', 'office_start_time', 'office_end_time']);

    for (const org of orgs) {
      const thisOrgAttendances = await attendance.find({
        user_id: '65972575f7234cb7a2f1d02e',
        organization_id: org._id,
        date: new Date().toISOString().split('T')[0],
      });

      const [endHour, endMinute] = (org.office_end_time || '17:00')
        .split(':')
        .map(Number);
      const officeEndTime = new Date();
      officeEndTime.setHours(endHour, endMinute, 0, 0);

      for (const record of thisOrgAttendances) {
        let totalProduction = 0;
        let totalOvertime = 0;
        let totalBreak = 0;

        let lastCheckIn: any = null;
        let lastCheckOut: any = null;

        // Check if auto check-out/check-in is needed
        const now = new Date();
        const isEndOfDay =
          now.getHours() === endHour && now.getMinutes() === endMinute;

        record.activity_logs.forEach(activity => {
          const activityTime = new Date(activity.timestamp);

          if (activity.activity === 'check_in') {
            if (lastCheckOut) {
              const diffMs = activityTime.getTime() - lastCheckOut.getTime();
              const diffSeconds = Math.floor(diffMs / 1000);
              totalBreak += diffSeconds;
              lastCheckOut = null;
            }
            lastCheckIn = activityTime;
          } else if (activity.activity === 'check_out' && lastCheckIn) {
            const diffMs = activityTime.getTime() - lastCheckIn.getTime();
            const diffSeconds = Math.floor(diffMs / 1000);
            totalProduction += diffSeconds;
            lastCheckIn = null;
            lastCheckOut = activityTime;
          }
        });

        // Auto-check-out at end of office time
        if (isEndOfDay && lastCheckIn && !lastCheckOut) {
          const autoCheckOutTime = officeEndTime;
          const diffMs = autoCheckOutTime.getTime() - lastCheckIn.getTime();
          const diffSeconds = Math.floor(diffMs / 1000);
          totalProduction += diffSeconds;

          record.activity_logs.push({
            activity: 'check_out',
            timestamp: autoCheckOutTime.toISOString(),
          });

          record.activity_logs.push({
            activity: 'check_in',
            timestamp: autoCheckOutTime.toISOString(),
          });
        }

        // Overtime calculation
        if (
          record.check_out &&
          new Date(record.check_out).getTime() > officeEndTime.getTime()
        ) {
          const checkOutTime = new Date(record.check_out).getTime();
          const diffMs = checkOutTime - officeEndTime.getTime();
          
          // Subtract the totalBreak time from the overtime calculation
          const overtimeWithoutBreak = diffMs - totalBreak;
        
          if (overtimeWithoutBreak > 0) {
            totalOvertime = Math.floor(overtimeWithoutBreak / 1000); // convert milliseconds to seconds
          }
        }

        console.log(
          // 'Total Production: ' + formatTime(totalProduction),
          'Total Overtime: ' + formatTime(totalOvertime),
          // 'Total Break: ' + formatTime(totalBreak)
        );

        // Update record
        // await attendance.updateOne(
        //   { _id: record._id },
        //   {
        //     production: totalProduction,
        //     overtime: totalOvertime,
        //     break: totalBreak,
        //     activity_logs: record.activity_logs,
        //   }
        // );
      }
    }
  } catch (error) {
    console.error('Error updating Attendance:', error);
  }
};
