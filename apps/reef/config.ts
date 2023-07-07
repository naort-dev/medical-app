import AppConfig from '../../src/types/appConfig'


export const config: AppConfig = {
  API_KEY: "f928006b-9429-4c71-b353-b67a9c803f0b",
  APP_ID: "reef", 
  APP_URL_SCHEME: "reef",
  ONESIGNAL_API_KEY: "123",
  MEDICAL: 'disabled'
}

const debugConfig: AppConfig = {
  ...config, 
  ONESIGNAL_API_KEY: undefined
}

const defaultConfig = __DEV__ ? debugConfig : config

export default defaultConfig