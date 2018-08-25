import { combineReducers } from 'redux'

import configureStore from '../reducers/store'
import rootSaga from '../sagas/index'
import { reducer as placesReducer } from '../reducers/places.reducer'

export default () => {
    const rootReducer = combineReducers({
        places: placesReducer
    })

    return configureStore(rootReducer, rootSaga)
}
