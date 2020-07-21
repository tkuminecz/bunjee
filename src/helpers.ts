export const getBaseUrl = (): string => {
  const useHttps = process.env.USE_HTTPS === 'true';
  const protocol = useHttps ? 'https://' : 'http://';
  return `${protocol}${process.env.VERCEL_URL}`;
};
