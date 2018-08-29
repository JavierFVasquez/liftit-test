import {
    NavLink
    , Redirect
    , Route
    , BrowserRouter as Router
    , Switch, withRouter
} from 'react-router-dom';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import Login from "../pages/Login";
import Start from "../pages/Start";


class AppRouter extends Component {

    constructor (props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount () {

    }
    render () {

        return (
            <Router>
                <Switch>
                    <Route
                        path={`/login`}
                        component={Login} />
                    <Route path="/start" component={Start}/>
                    <Route exact path="/" component={Login}/>
                        {/*<Route*/}
                            {/*path={`/available/:category_id`}*/}
                            {/*component={Login} />*/}
                </Switch>
            </Router>
        );
    }
}

export default (AppRouter);
