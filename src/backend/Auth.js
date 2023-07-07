import {ApiManager} from './ApiManager';

export async function sendOTP(phone) {
  try {
    console.log(phone);
    const response = await ApiManager.post('/authorize/sms', {phone});
    console.log(response);
    // console.log(response);
    return response.data;
  } catch (err) {
    console.error(err, JSON.stringify(err));
  }
}

export async function authorizeOTP(phone, otp_code) {
  const response = await ApiManager.post('/authorize/otp', {phone, otp_code});
  console.log(response);
  return response.data;
}

export async function updateUser(profile) {
  const response = await ApiManager.patch('/user', profile, {}, true);
  // console.log(response);
  return response.data;
}
