import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Layout, Form, Input, Button, Typography, Row, Select} from 'antd';
import {UserOutlined, MailOutlined} from '@ant-design/icons';
import firebase from '../../firebase';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [studentClass, setClass] = useState('');
    const [role, setRole] = useState('student');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const usersRef = firebase.database().ref('users');

    const saveUserInDb = (user) => {
        usersRef.child(user.uid)
            .set({
                firstName,
                lastName,
                email,
                role,
                studentClass,
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (firstName !== '' && lastName !== '' && email !== ''
            && password !== '' && confirmPassword !== '' && role !== '') {
            if (password !== confirmPassword) {
                setError('Паролите не съвпадат!');
            }
            else {
                setError('');

                firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then((data) => {
                        data.user.updateProfile({
                            displayName: firstName + ' ' + lastName
                        }).then(() => {
                            saveUserInDb(data.user);
                        }).catch(err => {
                            setError(err.message);
                        })
                    })
                    .catch(err => {
                        setError(err.message);
                    })
            }
        }
        else {
            setError('Всички полета са задължителни!');
        }
    };

    return (
        <div className='col-md-12 login-wrapper'>
            <div className='col-md-8 mx-auto'>
                <div className="card form-div">

                    <h5 className="card-header primary-color white-text text-center py-4">
                        <div className='text-center'>
                            <i className="fab fa-earlybirds text-white icon-huge"/>
                        </div>
                        <strong>Регистрация за School Judge</strong>
                    </h5>

                    <div className="card-body px-lg-5 pt-4">
                        <form className="text-center mt-4">
                            <div className='row col-md-12'>
                                <div className="md-form mb-3 col-md-6">
                                    <input onChange={(event) => setFirstName(event.target.value)}
                                           type="text" name='firstName' id="firstName-input" className="form-control"
                                           value={firstName}/>
                                    <label for="firstName-input">Име</label>
                                </div>

                                <div className="md-form col-md-6">
                                    <input onChange={(event) => setLastName(event.target.value)}
                                           value={lastName}
                                           type="text" className="form-control" id='lastName-input'/>
                                    <label for="lastName-input">Фамилия</label>
                                </div>
                            </div>
                            <div className='row col-md-12'>
                                <div className="md-form mb-3 col-md-6">
                                    <input onChange={(event) => setEmail(event.target.value)}
                                           type="email" name='email' id="email-input" className="form-control"
                                           value={email}/>
                                    <label for="email-input">Имейл</label>
                                </div>

                                <div className="md-form col-md-6">
                                    <select className="browser-default custom-select"
                                            onChange={(event) => {
                                                console.log(event.currentTarget.value);
                                                setRole(event.currentTarget.value)
                                            }}>
                                        <option value='student' selected>Ученик</option>
                                        <option value='teacher'>Учител</option>
                                    </select>
                                </div>
                            </div>
                            <div className={role === 'student' ? "md-form mb-3 col-md-12" : 'd-none'}>
                                <input onChange={(event) => setClass(event.target.value)}
                                       type="text" name='class' id="class-input" className="form-control"
                                       value={studentClass}/>
                                <label for="class-input">Клас</label>
                            </div>
                            <div className='row col-md-12'>
                                <div className="md-form mb-3 col-md-6">
                                    <input onChange={(event) => setPassword(event.target.value)}
                                           value={password}
                                           type="password" className="form-control" id='password-input'/>
                                    <label for="password-input">Парола</label>
                                </div>

                                <div className="md-form col-md-6">
                                    <input onChange={(event) => setConfirmPassword(event.target.value)}
                                           value={confirmPassword}
                                           type="password" className="form-control" id='confirmPassword-input'/>
                                    <label for="confirmPassword-input">Повторете паролата</label>
                                </div>
                                <small className={role === 'teacher' ? 'form-text text-warning' : 'd-none'}>
                                    * Учителската роля изисква удобрение от администратор. След регистрация ще
                                    трябва да изчакате удобрение.
                                </small>
                                <small className={(!error && 'd-none') + " text-center form-text text-danger"}>
                                    {error}
                                </small>
                            </div>
                            <button
                                className="btn btn-outline-primary btn-block my-4 waves-effect"
                                onClick={handleSubmit}>
                                Регистрация
                            </button>
                            <small className="form-text text-muted mb-4">
                                Имате вече акаунт? <Link to='/login'>Вход</Link>
                            </small>
                        </form>

                    </div>
                </div>
            </div>
        </div>

    )
};

export default Register;