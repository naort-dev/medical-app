import {ApiManager} from './ApiManager';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const analyitcs_uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const ANALYTICS_SESSION_ID = analyitcs_uid();

export async function createOrUpdateAnalyticsProfile(id) {
  try {
    const STORE_ID = await AsyncStorage.getItem('STORE_ID');
    const response = await ApiManager.put(`/analytics/profile/${id}`, {
      home_store_id: STORE_ID,
    });
    console.log(response);
    // console.log(response);
    return response.data;
  } catch (err) {
    console.error(err, JSON.stringify(err));
  }
}

export async function recordAnalytics(eventType, eventObj) {
  try {
    const ANALYTICS_PROFILE_ID = await AsyncStorage.getItem(
      'ANALYTICS_PROFILE_ID',
    );
    console.log(ANALYTICS_PROFILE_ID, {
      profileId: ANALYTICS_PROFILE_ID,
      ...eventObj,
    });
    const response = await ApiManager.post(
      `/analytics/event/${eventType}`,
      {
          profile_id: ANALYTICS_PROFILE_ID, 
          session_id: ANALYTICS_SESSION_ID,
          ...eventObj
        },
      {},
      true,
    );
    console.log(response);
    return response.data;
  } catch (err) {
    console.error(err, JSON.stringify(err));
  }
}
