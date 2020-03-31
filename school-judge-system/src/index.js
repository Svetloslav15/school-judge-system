import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import firebase from './firebase';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {BrowserRouter, Switch, Route, withRouter} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import rootReducer from './store/reducers/root-reducer';
import {setUser, clearUser} from './store/actions/user-actions';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Spinner from './components/common/Spinner';

const store = createStore(rootReducer);

const Root = (props) => {
    useEffect(() => {
        firebase.auth()
            .onAuthStateChanged(user => {
                if (user) {
                    props.setUser(user);
                    props.history.push('/')
                }
                else {
                    props.history.push('/login');
                    props.clearUser();
                }
            })
    }, []);

    return props.isLoading ? <Spinner/> : (
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
        </Switch>
    )
};

const mapStateToProps = state => ({
    isLoading: state.user.isLoading
});

const RootWithAuth = withRouter(connect(mapStateToProps, {setUser, clearUser})(Root));

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <RootWithAuth/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();