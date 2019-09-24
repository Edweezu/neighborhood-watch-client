import config from '../config'
import TokenService from './token-service'
import IdleService from './idle-service'

const UsersApiService =  {
    registerAccount (user) {
        return fetch(`${config.API_ENDPOINT}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        //forgot to json the response
        .then(res => {
            if (!res.ok) {
                console.log('fetch error resp', res)
                return res.json()
                    .then(e => Promise.reject(e))
            }
            return res.json()
        })
        
    },

    postLogin(user) {
        return fetch(`${config.API_ENDPOINT}/users/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => {
            if (!res.ok) {
                return res.json()
                    .then(e => Promise.reject(e))
            }
            return res.json()
        })
        .then(responseJson => {
            TokenService.saveAuthToken(responseJson.authToken)
            IdleService.registerIdleTimerResets()
            TokenService.queueCallbackBeforeExpiry(() => {
              UsersApiService.postRefreshToken()
            })
            return responseJson
        })
    },
    postRefreshToken() {
        return fetch(`${config.API_ENDPOINT}/users/refresh`, {
          method: 'POST',
          headers: {
            'authorization': `Bearer ${TokenService.getAuthToken()}`,
          },
        })
          .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
          .then(res => {
            TokenService.saveAuthToken(res.authToken)
            TokenService.queueCallbackBeforeExpiry(() => {
              UsersApiService.postRefreshToken()
            })
            return res
          })
          .catch(err => {
            console.error(err)
          })
      }
}

export default UsersApiService