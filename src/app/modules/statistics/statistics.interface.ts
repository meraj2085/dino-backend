export type ISuperAdminStats = {
  organizations: number;
  adminUsers: number;
  employees: number;
  bookings: number;
  employeesByGender: { name: string; value: number }[];
  activeByDate: { date: string; count: number }[];
};

export type IAdminStats = {
  employees: number;
  leaves: number;
  events: number;
  attendance: number;
  employeesByGender: { name: string, value: number }[];
  activeByDate: { date: string, count: number }[];
};

export type IEmployeeStats = {
  attendance: number;
  leaves: number;
  myTeam: number;
  upcomingEvents: number;
};
