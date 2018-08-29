import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import initStore from './reducers'
import { Provider } from 'react-redux'
import {createLogger} from 'redux-logger';
import Router from './navigation/router'
import styled, { injectGlobal } from 'styled-components';
import { normalizeCss } from './utils/css/normalize-css';

injectGlobal`
  ${normalizeCss}
`;

const store = initStore()

const FullWrapper=  styled.div`
width: 100%;
height: 100%;
`


class App extends React.Component {
    state = {
        loading: false,
    };

    componentWillMount(){
        document.body.style.height = '100%';
    }
    async componentDidMount() {
        // this.setState({
        //     loading: true,
        // })
    }

    render() {

        if (!this.state.loading) {
            return (
                <Provider store={store}>
                    <FullWrapper>
                        <Router/>
                    </FullWrapper>
                </Provider>
            )
        }else {
            return <h1>{'Cargando..............'}</h1>
        }
    }
}

ReactDOM.render(<App style={{ height : '100%'}} />, document.getElementById('root'));
registerServiceWorker();
