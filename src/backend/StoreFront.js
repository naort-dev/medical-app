/*import axios from 'axios';


export async function getProducts(params={}) {
    try {
        response = await axios.get('https://testing-api.weedapps.io/api/udistrict/storefront',{headers: {'Content-Type': 'application/json', 'Authorization': 'API-KEY-0000-0000'}})//, params:params})
        return response.data
    } catch (err) {
        console.error(err)
    }
    //console.log(res.data)
}*/
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ASSET_URL} from './Config';
import axios from 'axios';
import appConfig from 'app/config';

export class s3Service {
  /*
    get File retrieves JSON file from S3 Bucket
    inputs:
    -id: the id for the brand
    -file: the file name select from [storefront]
    */
  async getFile(needStoreId, file) {
    // const dynamo =  new dynamoService.dynamoService();
    // let id = await dynamo.getBrandByApiKey(apiKey);
    let id = appConfig.APP_ID;
    let store_id = await AsyncStorage.getItem('STORE_ID');

    let storePath = needStoreId ? `stores/${store_id}/` : '';
    const path = `${ASSET_URL}/${id}/${storePath}${file}.json`;

    //Fetch or read data from aws s3
    try {
      const json = await axios.get(path);
      let regex = /\,(?!\s*?[\{\[\"\'\w])/g;
      console.log(path, json.data);

      // javascript
      let input = json.data.toString(); // this is the initial string of data
      let correct = input.replace(regex, '');
      return JSON.parse(correct);
    } catch (err) {
      console.log(path, err);
      return JSON.parse('{"error":"s3 not working too good"}');
    }
  }
  async getMenuFile(file) {
    // const dynamo =  new dynamoService.dynamoService();
    // let id = await dynamo.getBrandByApiKey(apiKey);
    let id = appConfig.APP_ID;
    let store_id = await AsyncStorage.getItem('STORE_ID');

    const path = `${ASSET_URL}/${id}/stores/${store_id}/${file}.json`;

    console.log(path);
    //Fetch or read data from aws s3
    try {
      const json = await axios.get(path);
      console.log(path, json.data);

      // javascript
      return json.data;
    } catch (err) {
      console.log(path, err);
      return JSON.parse('{"error":"s3 not working too good"}');
    }
  }
  async getSignupFile(needStoreId, file) {
    // const dynamo =  new dynamoService.dynamoService();
    // let id = await dynamo.getBrandByApiKey(apiKey);
    let id = appConfig.APP_ID;
    let store_id = await AsyncStorage.getItem('STORE_ID');

    let storePath = needStoreId ? `stores/${store_id}/` : '';
    const path = `${ASSET_URL}/${id}/${storePath}${file}.json`;

    console.log(path);
    //Fetch or read data from aws s3
    try {
      const json = await axios.get(path);
      console.log(path, json.data);

      // javascript
      return json.data;
    } catch (err) {
      console.log(path, err);
      return JSON.parse('{"error":"s3 not working too good"}');
    }
  }
}
export default {s3Service};
