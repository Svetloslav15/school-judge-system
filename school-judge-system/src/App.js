import React from 'react';
import './App.css';
import firebase from './firebase';

function App() {
    const handleSignout = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                console.log('Signed out!');
            });
    };
    return (
        <div className='app'>
            <button onClick={handleSignout}>Sign Out</button>
        </div>
    );
}

export default App;
