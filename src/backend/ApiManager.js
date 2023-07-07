import axios from 'axios';
import {BaseUrl} from './Config';
import appConfig from 'app/config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {checkJwt} from '../helpers/error';

let instance = axios.create({
  baseURL: BaseUrl,
  headers: {
    Authorization: appConfig.API_KEY,
  },
});
const userAuthInstance = async () => {
  let token = await AsyncStorage.getItem('Token');
  token = token ? JSON.parse(token) : {};
  const authInstance = axios.create({
    baseURL: BaseUrl,
    headers: {
      Authorization: token.access_token,
    },
  });
  return authInstance;
};
export const ApiManager = {
  get: async (endpoint, params = {}, isUserAuth = false) => {
    let authInstance = instance;
    if (isUserAuth) {
      authInstance = await userAuthInstance();
    }
    return authInstance.get(endpoint, {params})//.catch(function (error) {
    //   if (error.response && error.response.data) {
    //     checkJwt(error);
    //   }
    // });
  },
  post: async (endpoint, body, params = {}, isUserAuth = false) => {
    let authInstance = instance;
    if (isUserAuth) {
      authInstance = await userAuthInstance();
    }

    return authInstance.post(endpoint, body, {params})//.catch(function (error) {
    //   if (error.response && error.response.data) {
    //     checkJwt(error);
    //   }
    // });
  },
  put: async (endpoint, body, params = {}, isUserAuth = false) => {
    let authInstance = instance;
    if (isUserAuth) {
      authInstance = await userAuthInstance();
    }

    return authInstance.put(endpoint, body, {params})//.catch(function (error) {
    //   if (error.response && error.response.data) {
    //     checkJwt(error);
    //   }
    // });
  },
  patch: async (endpoint, body, params = {}, isUserAuth = false) => {
    let authInstance = instance;
    if (isUserAuth) {
      authInstance = await userAuthInstance();
    }

    return authInstance.patch(endpoint, body, {params})//.catch(function (error) {
    //   if (error.response && error.response.data) {
    //     checkJwt(error);
    //   }
    // });
  },
  delete: async (endpoint, params, isUserAuth = false) => {
    let authInstance = instance;
    if (isUserAuth) {
      authInstance = await userAuthInstance();
    }

    return authInstance.delete(endpoint, {params})//.catch(function (error) {
    //   if (error.response && error.response.data) {
    //     checkJwt(error);
    //   }
    // });
  },
};

/**
 * EXAMPLE USAGE
 *  const response = await ApiManager.getData(`/movies.json`) // Final url will be BaseURL + "/movies.json" due to default base url
 *  if (response?.ok)
 *    console.log(response.data);
 *  else
 *    console.log("Error", response.error)
 */
