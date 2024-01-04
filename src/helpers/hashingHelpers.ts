import bcrypt from 'bcrypt';
import config from '../config';


const encrypt_password = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
};

const match_password = async (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(givenPassword, savedPassword);
};

export const hashingHelper = {
  encrypt_password,
  match_password,
};
