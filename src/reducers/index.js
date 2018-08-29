import { combineReducers } from 'redux'

import configureStore from '../reducers/store'
import rootSaga from '../sagas/index'
import { reducer as placesReducer } from '../reducers/places.reducer'
import { reducer as loginReducer } from '../reducers/login.reducer'

export default () => {
    const rootReducer = combineReducers({
        places: placesReducer,
        login: loginReducer
    })

    return configureStore(rootReducer, rootSaga)
}
