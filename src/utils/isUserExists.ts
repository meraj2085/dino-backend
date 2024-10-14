/* eslint-disable @typescript-eslint/no-explicit-any */

export const isUserExist = async function (office_email: string, UserDb: any) {
  return await UserDb.findOne(
    { office_email, status: 'Active' },
    { _id: 1, password: 1, user_type: 1, office_email: 1, organization_id: 1, role: 1 }
  ).lean();
};
