const CLIENT_URL = 'http://localhost:8080'
const BASE_URL = '/api'
const BASE_AUTH='/user'

///////// AUTH /////////
export const CURRENT_USER  = `${BASE_URL}${BASE_AUTH}/current`
export const SIGN_IN  = `${BASE_URL}${BASE_AUTH}/signin`
export const SIGN_UP  = `${BASE_URL}${BASE_AUTH}/signup`
export const GOOGLE_SIGN_IN = `${CLIENT_URL}${BASE_URL}${BASE_AUTH}/google`


