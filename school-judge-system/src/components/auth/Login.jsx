import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import firebase from '../../firebase';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignIn = (event) => {
        event.preventDefault();

        if (email !== '' && password !== '') {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(signInUser => {
                    console.log(signInUser);
                }).catch(err => setError(err.message))
        }
        else {
            setError('Всички полета са задължителни!');
        }
    };

    return (
        <div className='col-md-12 login-wrapper'>
            <div className='col-md-4 col-sm-6 mx-auto'>
                <div className="card form-div">

                    <h5 className="card-header primary-color white-text text-center py-4">
                        <div className='text-center'>
                            <i className="fas fa-graduation-cap text-white icon-huge"/>
                        </div>
                        <strong>Вход за School Judge</strong>
                    </h5>

                    <div className="card-body px-lg-5 pt-4">

                        <form className="text-center mt-4">

                            <div className="md-form mb-3">
                                <input onChange={(event) => setEmail(event.target.value)}
                                       type="email" name='email' id="email-input" className="form-control"
                                       value={email}/>
                                <label for="email-input">Имейл</label>
                            </div>

                            <div className="md-form">
                                <input onChange={(event) => setPassword(event.target.value)}
                                       value={password}
                                       type="password" className="form-control" id='password-input'/>
                                <label for="password-input">Парола</label>
                                <small className={(!error && 'd-none') + "form-text text-danger mb-4"}>
                                    {error}
                                </small>
                            </div>
                            <button
                                className="btn btn-outline-primary btn-block my-4 waves-effect"
                                onClick={handleSignIn}>Вход
                            </button>
                            <small className="form-text text-muted mb-4">
                                Нямате акаунт? <Link to='/register'>Регистрация</Link>
                            </small>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )

};

export default Login;