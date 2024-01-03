import { Organization } from "./organization.model";


export const findLastOrganizationCode = async (): Promise<string | undefined> => {
  const lastOrganization = await Organization.findOne(
    {},
    { company_code: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastOrganization?.company_code
    ? lastOrganization.company_code.substring(3)
    : undefined;
};

export const generateOrganizationCode = async (): Promise<string> => {
  const currentCode =
    (await findLastOrganizationCode()) ||
    (0).toString().padStart(4, '0');
  let incrementedCode = (parseInt(currentCode) + 1).toString().padStart(4, '0');
  incrementedCode = `ORG${incrementedCode}`;

  return incrementedCode;
};
