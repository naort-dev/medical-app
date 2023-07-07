import {ApiManager} from './ApiManager';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function loadAllOrders() {
  try {
    const STORE_ID = await AsyncStorage.getItem('STORE_ID');
    const response = await ApiManager.get(
      `/order?store_id=${STORE_ID}`,
      {},
      true,
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getCheckout(id) {
  const response = await ApiManager.get(
    `checkout/${id}`, 
    {}, 
    {}, 
    true
  )
  return response.data
}

export async function confirmCheckout(id, payload) {
  try {
    const response = await ApiManager.post(
      `/checkout/${id}/confirm`,
      payload,
      {},
      true,
    );
    // console.log(response);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}
export async function cancelCheckout(id) {
  try {
    const response = await ApiManager.delete(`/checkout/${id}`, {}, true);
    console.log(response);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}
export async function postCheckout(items) {
  const STORE_ID = await AsyncStorage.getItem('STORE_ID');
  console.log({storeId: STORE_ID, items});
  const response = await ApiManager.post(
    '/checkout/start',
    {store_id: STORE_ID, items},
    {},
    true,
  );
  console.log(response);
  return response.data;
}

export async function getProducts(params = {}) {
  try {
    const STORE_ID = await AsyncStorage.getItem('STORE_ID');
    const response = await ApiManager.get(`/menu/${STORE_ID}/search`, params, true);
    // console.log(response);
    return response.data.filter((item) => item.status === 'active');
  } catch (err) {
    console.error(err);
  }
}

export async function getProduct(params = {}) {
  try {
    const STORE_ID = await AsyncStorage.getItem('STORE_ID');
    const response = await ApiManager.get(`/menu/${STORE_ID}/product`, params, true);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getBrands(params = {}) {
  try {
    const STORE_ID = await AsyncStorage.getItem('STORE_ID');
    const response = await ApiManager.get(`/menu/${STORE_ID}/brand`, {}, true);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getStores(params = {}) {
  try {
    const response = await ApiManager.get('/company/stores', {}, true);

    return response.data;
  } catch (err) {
    console.error(err);
  }
}
