const LOCALHOST = false // '10.0.0.161'
export const BaseUrl = LOCALHOST
  ? `http://${LOCALHOST}:3001/api`
  : 'https://testing-api.weedapps.io/api';
export const ASSET_URL = LOCALHOST
  ? `http://${LOCALHOST}:3010/app`
  : 'https://staging-static.weedapps.io/app';


export const getImgAssetUrl = (appId) => {
  return `${ASSET_URL}/${appId}`;
};
