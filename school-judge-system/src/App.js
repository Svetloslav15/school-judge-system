import React, {useEffect, useState} from 'react';
import './App.css';
import Navigation from './components/common/navigation/Navigation';
import {Switch, Route} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import AddTest from './components/admin/add-test/AddTest';
import Home from './components/home/Home';
import MyTests from './components/admin/my-tests/MyTests';

function App(props) {
    const [path, setPath] = useState(props.location.pathname);

    useEffect(() => {
        setPath(props.location.pathname);
    }, [props.location]);
    return (
        <div className='bg-image'>
            <Navigation/>
            {path === '/' && <MyTests/>}
            {path === '/admin/tests/add' && <AddTest/>}
            {path === '/admin/tests/mine' && <MyTests/>}
        </div>
    );
}

export default withRouter(App);
