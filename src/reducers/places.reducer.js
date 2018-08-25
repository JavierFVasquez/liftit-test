
import { createReducer, createActions } from 'reduxsauce'
import { Map } from 'immutable'

const { Types, Creators } = createActions({
    placesOrigin: null,
    directions: null,
    setDirections: ['directionsData'],
    placesDestination: null,
    setKeywordOrigin: ['keywordOrigin'],
    setKeywordDestination: ['keywordDestination'],
    setPlacesOrigin: ['placesOrigin'],
    setPlacesDestination: ['placesDestination']
})

export const PlacesTypes = Types
export default Creators

/* ------------- Initial State ------------ - */
export const INITIAL_STATE = Map({
    placesOrigin: [],
    placesDestination: [],
    keywordDestination: '',
    keywordOrign: '',
    directionsData: []
})

/* ------------- Reducers ------------- */
const placesOrigin = state => state
const placesDestination = state => state
const directions = state => state

const setPlacesOrigin = (state, { placesOrigin }) =>
    state.mergeDeep(Map({
        placesOrigin
    }))
const setPlacesDestination = (state, { placesDestination }) =>
    state.mergeDeep(Map({
        placesDestination
    }))
const setKeywordDestination = (state, { keywordDestination }) =>
    state.mergeDeep(Map({
        keywordDestination
    }))
const setKeywordOrigin = (state, { keywordOrigin }) =>
    state.mergeDeep(Map({
        keywordOrigin
    }))
const setDirections = (state, { directionsData }) =>
    state.mergeDeep(Map({
        directionsData
    }))

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.PLACES_ORIGIN]: placesOrigin,
    [Types.PLACES_DESTINATION]: placesDestination,
    [Types.SET_PLACES_ORIGIN]: setPlacesOrigin,
    [Types.SET_PLACES_DESTINATION]: setPlacesDestination,
    [Types.SET_KEYWORD_ORIGIN]: setKeywordOrigin,
    [Types.SET_KEYWORD_DESTINATION]: setKeywordDestination,
    [Types.DIRECTIONS]: directions,
    [Types.SET_DIRECTIONS]: setDirections,
})
