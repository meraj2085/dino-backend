export const getDaysInMonth = (year: number, month: number): string[] => {
  const date = new Date(year, month - 1, 1);
  const days: string[] = [];
  while (date.getMonth() === month - 1) {
    days.push(date.toISOString().split('T')[0]);
    date.setDate(date.getDate() + 1);
  }
  return days;
};

export const formatSecondToTime = (seconds: any, showSecond = false) => {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const remainingSeconds = String(seconds % 60).padStart(2, '0');

  if (showSecond) {
    return `${hours}:${minutes}:${remainingSeconds}`;
  } else {
    return `${hours}:${minutes}`;
  }
};

export const calculateTotalWorkingHours = (
  startTime: string,
  endTime: string
): string => {
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = endHour * 60 + endMinute;
  const diffMinutes = endTotalMinutes - startTotalMinutes;

  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  return `${hours}:${minutes}:00`;
};
