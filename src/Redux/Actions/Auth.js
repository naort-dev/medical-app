import {
  LOGIN,
  LOGOUT,
  LOAD_COMPANY,
  SELECT_STORE,
  SET_ANALYTICS_PROFILE_ID,
} from '../Types';

export const login = (payload) => {
  return {
    type: LOGIN,
    payload: payload,
  };
};
export const logout = () => {
  return {
    type: LOGOUT,
    payload: {uid: ''},
  };
};

export const loadCompanyAction = (payload) => {
  return {
    type: LOAD_COMPANY,
    payload: payload,
  };
};

export const selectStoreAction = (payload) => {
  return {
    type: SELECT_STORE,
    payload: payload,
  };
};

export const setAnalayticsProfileId = (payload) => {
  return {
    type: SET_ANALYTICS_PROFILE_ID,
    payload: payload,
  };
};
