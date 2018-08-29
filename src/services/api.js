import apisauce from 'apisauce'

const create = (baseURL = 'http://localhost:3005/') => {
    // timeout: 2000
    const api = apisauce.create({
        baseURL,
        timeout: 20000,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    })

    const login = (user,pass) =>
            api.post('/login', {user: user, pass: pass})


    return {
        login,
    }
}

// let's return back our create method as the default.
export default {
    create
}
