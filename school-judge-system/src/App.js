import React from 'react';
import './App.css';
import Navigation from './components/common/navigation/Navigation';
import Home from './components/home/Home';

const App = () =>{
    return (
        <div className='bg-image'>
            <Navigation/>
            <Home/>
        </div>
    );
};

export default App;
