import 'isomorphic-unfetch';

export const getCanonicalUrl = async (): Promise<string> => {
  const CURRENT_URL = process.env.VERCEL_URL;
  const API_TOKEN = process.env.VERCEL_API_TOKEN;

  // fetch deployment info
  const res = await fetch(
    `https://api.vercel.com/v11/now/deployments/get?url=${CURRENT_URL}`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );
  console.log(res);
  if (res.ok) {
    const deployInfo = await res.json();
    console.log({ CURRENT_URL });
    console.log('got deployment info', deployInfo);
    const [firstAlias] = deployInfo?.alias || [];
    if (firstAlias) return firstAlias;
  }
  // we couldn't find an alias, just use CURRENT_URL
  return CURRENT_URL;
};
