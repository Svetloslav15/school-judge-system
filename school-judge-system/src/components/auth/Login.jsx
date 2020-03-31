import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Layout, Form, Input, Button, Typography} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import firebase from '../../firebase';

const {Title} = Typography;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignIn = () => {
      if (email !== '' && password !== ''){
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
        <Layout className='login-wrapper'>
            <Form className='form-div box-shadow'>
                <div className='text-center'>
                    <i className="fas fa-graduation-cap text-white icon-huge"/>
                </div>
                <Title level={3}><span className="text-white">Вход за School Judge</span></Title>
                <Form.Item
                    name="email"
                    rules={[{required: true, message: 'Въведете имейл!'}]}
                >
                    <Input
                        placeholder='Имейл'
                        type='email'
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                        prefix={<UserOutlined />}
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{required: true, message: 'Въведете парола!'}]}
                >
                    <Input.Password
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}
                        placeholder='Парола'
                    />
                </Form.Item>
                <Form.Item className='text-center'>
                    <Button type="primary" onClick={handleSignIn}>
                        Вход
                    </Button>
                </Form.Item>
                <Typography.Text className={error ? 'd-block text-red' : 'd-none'}>
                    {error}
                </Typography.Text>
                <Typography.Text>
                    <div className='text-center'>
                        <span className='text-white'>Нямате акаунт? </span>
                        <Link to='/register'>Регистрация</Link>
                    </div>
                </Typography.Text>
            </Form>
        </Layout>
    )
};

export default Login;