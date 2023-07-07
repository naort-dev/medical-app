import {ApiManager} from './ApiManager';

export async function getCompany() {
  const response = await ApiManager.get('/company');
  return response.data;
}
