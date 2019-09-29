import config from '../config'
import jwtDecode from 'jwt-decode'

let _timeoutId
const _TEN_SECONDS_IN_MS = 10000


const TokenService = {
  saveAuthToken(token) {
    window.sessionStorage.setItem(config.TOKEN_KEY, token)
  },

  getAuthToken() {
    return window.sessionStorage.getItem(config.TOKEN_KEY)
  },

  clearAuthToken() {
    window.sessionStorage.removeItem(config.TOKEN_KEY)
  },

  hasAuthToken() {
    return !!TokenService.getAuthToken()
  },

  parseJwt(jwt) {
    return jwtDecode(jwt)
  },

  readJwtToken() {
    return TokenService.parseJwt(TokenService.getAuthToken())
  },

  //payload.exp is time expressed in seconds since epoch 
  _getMsUntilExpiry(payload) {
    return (payload.exp * 1000) - Date.now()
  },

  //
  queueCallbackBeforeExpiry(callback) {
    const msUntilExpiry = TokenService._getMsUntilExpiry(
      TokenService.readJwtToken()
    )
    _timeoutId = setTimeout(callback, msUntilExpiry - _TEN_SECONDS_IN_MS)
  },

  clearCallbackBeforeExpiry() {
    clearTimeout(_timeoutId)
  },

}

export default TokenService
