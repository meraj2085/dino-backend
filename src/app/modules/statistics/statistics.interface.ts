export type ISuperAdminStats = {
  organizations: number;
  adminUsers: number;
  employees: number;
  bookings: number;
};

export type IAdminStats = {
  employees: number;
  leaves: number;
  events: number;
  attendance: number;
};

export type IEmployeeStats = {
  attendance: number;
  leaves: number;
  myTeam: number;
  upcomingEvents: number;
};
