import React from 'react';
import {Link} from 'react-router-dom';
import firebase from "../../../firebase";
import {connect} from 'react-redux';

const Navigation = ({user}) => {
    const handleSignout = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                console.log('Signed out!');
            });
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark primary-color">

            <a className="navbar-brand" href="#">School Judge</a>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
                    aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="basicExampleNav">

                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Начало</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/administration">Администрация</Link>
                    </li>
                </ul>

                <ul className="navbar-nav nav-flex-icons">
                    <li className="nav-item">
                        <Link className="nav-link" to="#">
                            Здравей, <span className='font-weight-bold'>{user.displayName}</span>!
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#" onClick={handleSignout}>Изход</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
const mapStateToProps = (state) => ({
    user: state.user.currentUser
});

export default connect(mapStateToProps, null)(Navigation);