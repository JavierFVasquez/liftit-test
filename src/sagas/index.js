import { takeEvery, all, takeLatest } from 'redux-saga/effects'
import PLACES_API from '../services/google_api'
import {PlacesTypes} from '../reducers/places.reducer'
import {
    getPlaces
} from '../sagas/places.saga'
import {getPlacesDestination,getPlacesOrigin,getDirections} from "./places.saga";


export const places_api = PLACES_API.create()

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
    yield all([
        takeEvery(PlacesTypes.PLACES_ORIGIN, getPlacesOrigin, places_api),
        takeEvery(PlacesTypes.PLACES_DESTINATION, getPlacesDestination, places_api),
        takeEvery(PlacesTypes.DIRECTIONS, getDirections, places_api),
        takeEvery(PlacesTypes.SET_PLACES_ORIGIN, getDirections, places_api),
        takeEvery(PlacesTypes.SET_PLACES_DESTINATION, getDirections, places_api),
    ])
}
