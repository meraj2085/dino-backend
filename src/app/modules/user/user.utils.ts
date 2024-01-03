import { User } from "./user.model";

export const findLastEmployeeCode = async (
  organization_id:string
): Promise<string | undefined> => {
  const lastEmployee = await User.findOne(
    { organization_id },
    { employee_code: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastEmployee?.employee_code
    ? lastEmployee.employee_code.substring(3)
    : undefined;
};

export const generateEmployeeCode = async (organization_id:string): Promise<string> => {
  const currentId =
    (await findLastEmployeeCode(organization_id)) ||
    (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `EMP${incrementedId}`;

  return incrementedId;
};
