import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger, {createLogger} from 'redux-logger'

export default (rootReducer, rootSaga) => {
    const middleware = []
    const enhancers = []
    //const sagaMonitor = process.env.NODE_ENV === 'development' ? console.tron.createSagaMonitor() : null
    const sagaMiddleware = createSagaMiddleware()
    middleware.push(sagaMiddleware)
    middleware.push(createLogger());
    enhancers.push(applyMiddleware(...middleware))

    const createAppropriateStore = createStore
    const store = createAppropriateStore(rootReducer, compose(...enhancers))

    sagaMiddleware.run(rootSaga)

    return store
}
