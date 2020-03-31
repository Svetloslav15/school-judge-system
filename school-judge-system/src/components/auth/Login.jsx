import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Layout, Form, Input, Button, Typography} from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Login = () => {
    return (
        <Layout className='login-wrapper'>
            <Form className='form-div box-shadow'>
                <div className='text-center'>
                    <i className="fas fa-graduation-cap text-white icon-huge"/>
                </div>
                <Typography.Title level={3}><span className="text-white">Вход за School Judge</span></Typography.Title>
                <Form.Item
                    name="email"
                    rules={[{required: true, message: 'Въведете имейл!'}]}
                >
                    <Input
                        placeholder='Имейл'
                        type='email'
                        prefix={<UserOutlined />}
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{required: true, message: 'Въведете парола!'}]}
                >
                    <Input.Password
                        placeholder='Парола'
                    />
                </Form.Item>
                <Form.Item className='text-center'>
                    <Button type="primary" htmlType="submit">
                        Вход
                    </Button>
                </Form.Item>
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