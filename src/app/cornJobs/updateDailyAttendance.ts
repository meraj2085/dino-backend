import { attendance } from '../modules/attendance/attendance.model';

const formatTime = (seconds: any) => {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const remainingSeconds = String(seconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${remainingSeconds}`;
};

export const updateDailyAttendance = async (req, res) => {
  try {
    const allAttendances = await attendance.find({
      user_id: '65972575f7234cb7a2f1d02e',
      date: new Date().toISOString().split('T')[0],
    });

    for (const record of allAttendances) {
      let totalProduction = 0;
      let totalOvertime = 0;
      let totalBreak = 0;

      let lastCheckIn: any = null;
      let lastCheckOut: any = null;

      // Process activity logs
      record.activity_logs.forEach(activity => {
        const activityTime = new Date(activity.timestamp);

        if (activity.activity === 'check_in') {
          if (lastCheckOut) {
            // Calculate break time between check_out and check_in
            const diffMs = activityTime.getTime() - lastCheckOut.getTime();
            const diffSeconds = Math.floor(diffMs / 1000);
            totalBreak += diffSeconds;
            lastCheckOut = null; // Reset last check-out after calculating break
          }
          lastCheckIn = activityTime;
        } else if (activity.activity === 'check_out' && lastCheckIn) {
          // Calculate production time between check_in and check_out
          const diffMs = activityTime.getTime() - lastCheckIn.getTime();
          const diffSeconds = Math.floor(diffMs / 1000);
          totalProduction += diffSeconds;
          lastCheckIn = null; // Reset last check-in after calculating production
          lastCheckOut = activityTime; // Set last check-out for potential break calculation
        }
      });

      // Add overtime if after working hours (example: after 5:00 PM)
      const officeEndTime = new Date().setHours(17, 0, 0, 0); // 5:00 PM
      if (
        record.check_out &&
        new Date(record.check_out).getTime() > officeEndTime
      ) {
        const diffMs = new Date(record.check_out).getTime() - officeEndTime;
        totalOvertime = Math.floor(diffMs / 1000);
      }

      console.log(
        'Total Production: ' + formatTime(totalProduction),
        'Total Overtime: ' + formatTime(totalOvertime),
        'Total Break: ' + formatTime(totalBreak)
      );

      //   Update the attendance record with calculated values
      await attendance.updateOne(
        { _id: record._id },
        {
          production: totalProduction,
          overtime: totalOvertime,
          break: totalBreak,
        }
      );
    }

    res.send({
      status: 200,
      message: 'Attendance updated successfully.',
    });
    // console.log('Attendance updated successfully.');
  } catch (error) {
    console.error('Error updating Attendance:', error);
    res.send({
      status: 500,
      message: 'Error updating Attendance',
    });
  }
};
