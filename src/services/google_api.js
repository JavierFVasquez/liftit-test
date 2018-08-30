import apisauce from 'apisauce'

const create = (baseURL = 'https://maps.googleapis.com/maps/api/') => {
    // timeout: 2000
    const api = apisauce.create({
        baseURL,
        timeout: 20000,
        mode: 'no-cors',
    })

    api.setHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    })

    const places = keyword =>
        api.get(`/place/nearbysearch/json?location=4.661934,-74.097383&radius=100000&strictbounds&language=es&keyword=${keyword}&key=AIzaSyDxbFXNECkoRKjJr3f0L2fqSGVYcP_cQiA`, {})


    const directions = (origin,destination) =>
        api.get(`/directions/json?departure_time=now&origin=${origin}&destination=${destination}&key=AIzaSyDxbFXNECkoRKjJr3f0L2fqSGVYcP_cQiA`, {})

    return {
        places,
        directions
    }
}

// let's return back our create method as the default.
export default {
    create
}
