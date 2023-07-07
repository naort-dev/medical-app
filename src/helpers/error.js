import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApiManager} from '../backend/ApiManager';

export async function checkJwt(err) {
  try {
    console.log(err.response.data.message);
    let token = await AsyncStorage.getItem('Token');
    token = token ? JSON.parse(token) : {};
    if (
      err.response.data.message === 'jwt expired' ||
      (err.response.data.message === 'UnAuthorized' && token.access_token)
    ) {
      let phone = await AsyncStorage.getItem('phone');
      phone = phone ? phone : '';
      const response = await ApiManager.post('/authorize/refresh', {
        phone,
        refresh_token: token.refresh_token,
      });
      await AsyncStorage.setItem(
        'Token',
        JSON.stringify({
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
        }),
      );
    }
  } catch (error) {
    await AsyncStorage.setItem('isLoggedIn', 'false');
  }
}
