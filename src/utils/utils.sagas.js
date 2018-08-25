const getSearchKeywordOrigin = state => state.places.get('keywordOrigin')
const getSearchKeywordDestination = state => state.places.get('keywordDestination')
const getDestinationCoords = state => state.places.get('placesOrigin').length > 0 ? `${state.places.get('placesOrigin')[0].geometry.location.lat},${state.places.get('placesOrigin')[0].geometry.location.lng}`: 0.0
const getOriginCoords = state => state.places.get('placesOrigin').length > 0 ? `${state.places.get('placesDestination')[0].geometry.location.lat},${state.places.get('placesDestination')[0].geometry.location.lng}` : 0.0


export default {
    getSearchKeywordOrigin,
    getSearchKeywordDestination,
    getDestinationCoords,
    getOriginCoords,
}
