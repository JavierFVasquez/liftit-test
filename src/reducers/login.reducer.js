
import { createReducer, createActions } from 'reduxsauce'
import { Map } from 'immutable'

const { Types, Creators } = createActions({
    login: ['user', 'pass'],
    setLoginData: ['loginData'],
    logout: null,
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------ - */
export const INITIAL_STATE = Map({
    loginData: {}
})

/* ------------- Reducers ------------- */
const login = state => state

const logout = (state, { }) => {
    localStorage.removeItem('id_token');
    return state.mergeDeep(Map({
        loginData: {}
    }))
}
const setLoginData = (state, { loginData }) =>
    state.mergeDeep(Map({
        loginData
    }))


/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOGIN]: login,
    [Types.LOGOUT]: logout,
    [Types.SET_LOGIN_DATA]: setLoginData,

})
