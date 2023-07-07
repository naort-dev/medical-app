import {SET_LOADER_VISIBLE, LOAD_STOREFRONT} from '../Types';
export const setLoaderVisible = (payload) => {
  return {
    type: SET_LOADER_VISIBLE,
    payload: payload,
  };
};

export const setStoreFront = (payload) => {
  return {
    type: LOAD_STOREFRONT,
    payload: payload,
  };
};
