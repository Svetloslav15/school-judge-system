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

            <Link className="navbar-brand h1 font-weight-bold" to="/test/home">School Judge</Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
                    aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>

            <div className="collapse navbar-collapse" id="basicExampleNav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Начало</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/test/home">Тест Старт</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown"
                           aria-haspopup="true" aria-expanded="false">Администрация</a>
                        <div className="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink">
                            <Link className="dropdown-item" to="/admin/tests/add">
                                <i className="fas fa-plus-square mr-3"/>
                                Добави тест
                            </Link>
                            <Link className="dropdown-item" to="/admin/tests/mine">
                                <i className="fas fa-envelope-open-text mr-3"/>
                                Мойте тестове
                            </Link>
                        </div>
                    </li>
                </ul>

                <ul className="navbar-nav nav-flex-icons">
                    <li className="nav-item">
                        <Link className="nav-link" to="#">
                            Здравей, <span className='font-weight-bold'>{user.displayName}</span>!
                        </Link>
                    </li>
                    <li className="nav-item ml-1">
                        <Link className="nav-link" to="#" onClick={handleSignout}>
                            Изход <i className="fas fa-sign-out-alt"/>
                        </Link>
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