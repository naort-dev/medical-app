

export type AppConfig = {
  API_KEY: string, 
  APP_ID: string
  APP_URL_SCHEME: string
  ONESIGNAL_API_KEY?: string, 
  MEDICAL: 'required' | 'optional' | 'disabled'
}

export default AppConfig