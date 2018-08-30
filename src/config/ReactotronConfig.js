import Reactotron from 'reactotron-react-js'
const apisaucePlugin = require('reactotron-apisauce')
const sagaPlugin = require('reactotron-redux-saga')
const { reactotronRedux } = require('reactotron-redux')

//if (process.env.NODE_ENV === 'development') {
    Reactotron.configure({
        name: 'liftit-test',
        lan: 'exp://localhost:3006',
    })
        .use(apisaucePlugin())
        .use(reactotronRedux())
        .use(sagaPlugin())
        .connect()
    Reactotron.clear()
    console.tron = Reactotron
//} else {
    /*console.tron = {
        log: () => false,
        warn: () => false,
        error: () => false,
        display: () => false,
        image: () => false
    }*/
//}

