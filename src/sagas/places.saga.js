import { put, select, call } from 'redux-saga/effects'
import Utils from '../utils/utils.sagas'
import PlacesActions from '../reducers/places.reducer'

export function* getPlacesOrigin(api, action) {
    const keyword = yield select(Utils.getSearchKeywordOrigin)
    console.log(keyword)
    const response = yield call(api.places, keyword)
    switch (response.status) {
        case 200:
            yield put(PlacesActions.setPlacesOrigin(response.data.results))
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

export function* getPlacesDestination(api, action) {
    const keyword = yield select(Utils.getSearchKeywordDestination)
    console.log(keyword)
    const response = yield call(api.places, keyword)
    switch (response.status) {
        case 200:
            yield put(PlacesActions.setPlacesDestination(response.data.results))
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
export function* getDirections(api, action) {
    const origin = yield select(Utils.getDestinationCoords)
    const destination = yield select(Utils.getOriginCoords)
    const response = yield call(api.directions, origin,destination)
    switch (response.status) {
        case 200:
            yield put(PlacesActions.setDirections(response.data))
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
