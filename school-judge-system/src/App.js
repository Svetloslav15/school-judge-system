import React, {useEffect, useState} from 'react';
import './App.css';
import Navigation from './components/common/navigation/Navigation';
import {withRouter} from 'react-router-dom';
import Home from './components/home/Home';

function App(props) {
    const [path, setPath] = useState(props.location.pathname);

    useEffect(() => {
        setPath(props.location.pathname);
    }, [props.location]);
    return (
        <div className='bg-image'>
            <Navigation/>
            <Home/>
        </div>
    );
}

export default withRouter(App);
