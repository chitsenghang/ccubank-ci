export const generateOtpCodeByGivenLength = (length: number) => {
  const chars: string = '012456789';
  let token: string = '';
  for (let i = 0; i < length; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
};
