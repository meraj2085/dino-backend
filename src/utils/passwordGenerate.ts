export const generateStrongPassword = async () => {
  const length = 12;
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = 'Dino-';

  for (let i = 0; i < length - 5; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return password;
};
