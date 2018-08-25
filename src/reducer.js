
import { createReducer, createActions } from 'reduxsauce'
import { Map } from 'immutable'

const { Types, Creators } = createActions({
    goTo: ['currentScreen'],
    login: ['isLogged']
})

export const RoutesTypes = Types
export default Creators

/* ------------- Initial State ------------ - */
export const INITIAL_STATE = Map({
    isLogged: false,
    currentScreen: ''
})

/* ------------- Reducers ------------- */
const login = (state, { isLogged }) =>
    state.mergeDeep(Map({
        isLogged
    }))

 const goTo = (state, { currentScreen }) =>
     state.mergeDeep(Map({
         currentScreen
     }))
/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GO_TO]: goTo,
    [Types.LOGIN]: login
})
