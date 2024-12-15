export const getDaysInMonth = (year: number, month: number): string[] => {
  const date = new Date(year, month - 1, 1);
  const days: string[] = [];
  while (date.getMonth() === month - 1) {
    days.push(date.toISOString().split('T')[0]);
    date.setDate(date.getDate() + 1);
  }
  return days;
};
