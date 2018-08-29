import { put, select, call } from 'redux-saga/effects'
import Utils from '../utils/utils.sagas'
import LoginActions from '../reducers/login.reducer'


export function* login(api, action) {

        const response = yield call(api.login, action.user, action.pass)
        switch (response.status) {
            case 200:
                console.log('RESPONSE', response)
                yield put(LoginActions.setLoginData(response.data))
                response.data.data && response.data.success && localStorage.setItem('id_token', response.data.data.token);
                break
            case 400:
            case 401:
            case 403:
            case 404:
            case 422:
            default:
                console.log(response)
        }

}
