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
    const [role, setRole] = useState('');
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

    const handleSubmit = () => {
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
        <Layout className='register-wrapper'>
            <Form className='form-div box-shadow'>
                <div>
                    <i className="fas fa-laptop-code text-white icon-huge"/>
                </div>
                <Typography.Title level={3}><span
                    className="text-white">Регистрация за School Judge</span></Typography.Title>
                <div className='mx-auto'>
                    <Row>
                        <Form.Item
                            name="firstName"
                            rules={[{required: true, message: 'Въведете име!'}]}
                            className='mr-1'
                        >
                            <Input
                                placeholder='Име'
                                type='text'
                                prefix={<UserOutlined/>}
                                onChange={(event) => setFirstName(event.target.value)}
                                value={firstName}
                            />
                        </Form.Item>
                        <Form.Item
                            name="lastName"
                            rules={[{required: true, message: 'Въведете фамилия!'}]}
                        >
                            <Input
                                placeholder='Фамилия'
                                type='text'
                                prefix={<UserOutlined/>}
                                onChange={(event) => setLastName(event.target.value)}
                                value={lastName}
                            />
                        </Form.Item>
                    </Row>
                    <Row>
                        <Form.Item
                            name="email"
                            rules={[{required: true, message: 'Въведете имейл!'}]}
                            className='mr-1'
                        >
                            <Input
                                placeholder='Имейл'
                                type='email'
                                prefix={<MailOutlined/>}
                                onChange={(event) => setEmail(event.target.value)}
                                value={email}
                            />
                        </Form.Item>
                        <Form.Item className='role-select'>
                            <Select defaultValue="Роля" onChange={(value) => setRole(value)}>
                                <Select.Option value="student">Ученик</Select.Option>
                                <Select.Option value="teacher">Учител</Select.Option>
                            </Select>

                        </Form.Item>
                    </Row>
                    <Form.Item
                        name="class"
                        className={role === 'student' ? 'd-block' : 'd-none'}
                    >
                        <Input
                            placeholder='Клас - пример: 10А'
                            type='text'
                            prefix={<UserOutlined/>}
                            onChange={(event) => setClass(event.target.value)}
                            value={studentClass}
                        />
                    </Form.Item>
                    <Row>
                        <Form.Item
                            name="password"
                            rules={[{required: true, message: 'Въведете парола!'}]}
                            className='mr-1'
                        >
                            <Input.Password
                                placeholder='Парола'
                                onChange={(event) => setPassword(event.target.value)}
                                value={password}
                            />
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            rules={[{required: true, message: 'Въведете повторно паролата!'}]}
                        >
                            <Input.Password
                                placeholder='Повторете паролата'
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                value={confirmPassword}
                            />
                        </Form.Item>
                    </Row>
                </div>
                <Typography.Text className={role === 'teacher' ? 'role-message d-inline-block' : 'd-none role-message'}>
                    * Учителската роля изисква удобрение от администратор
                </Typography.Text>
                <Typography.Text className={error ? 'd-block text-red' : 'd-none'}>
                    {error}
                </Typography.Text>
                <Form.Item>
                    <Button type="primary" htmlType="submit"
                            onClick={handleSubmit}>
                        Регистрация
                    </Button>
                </Form.Item>
                <Typography.Text>
                    <span className='text-white'>Имате акаунт? </span>
                    <Link to='/login'>Вход</Link>
                </Typography.Text>
            </Form>
        </Layout>
    )
};

export default Register;