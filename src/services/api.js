import apisauce from 'apisauce'

const create = (baseURL = 'http://sandbox.pads.com.co/api/') => {
    // timeout: 2000
    const api = apisauce.create({
        baseURL,
        timeout: 20000,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    })

    const setToken = authorization =>
        authorization ? { headers: { authorization } } : {}

    const listings = authorization =>
        api.get('/listings?published=true&transactions=rent_out&max=10&lng=4.707228&lat=-74.044162', {}, setToken(authorization))



    return {
        listings,
    }
}

// let's return back our create method as the default.
export default {
    create
}
