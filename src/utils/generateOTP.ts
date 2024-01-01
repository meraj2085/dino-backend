export const generateOTP = (length = 6) => {
  const OTP = Math.random()
    .toString()
    .slice(2, length + 2);
  return OTP;
};
