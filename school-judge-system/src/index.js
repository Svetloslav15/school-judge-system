import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import firebase from './firebase';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';
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
import MyTests from './components/admin/my-tests/MyTests';
import AddTest from './components/admin/add-test/AddTest';
import TestHome from './components/test/test-home/TestHome';
import FinishTest from './components/test/test-home/FinishTest';
import CheatedTest from "./components/test/test-home/CheatedTest";
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
        <div>
            <ToastContainer/>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/test/home/:id" component={TestHome}/>
                <Route exact path="/test/finish" component={FinishTest}/>
                <Route exact path="/test/cheated" component={CheatedTest}/>
                <Route exact path="/admin/tests/add" component={AddTest}/>
                <Route exact path="/admin/tests/mine" component={MyTests}/>
            </Switch>
        </div>
    )
};

const mapStateToProps = state => ({
    isLoading: state.user.isLoading
});

const RootWithAuth = withRouter(connect(mapStateToProps, {setUser, clearUser})(Root));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <RootWithAuth/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();