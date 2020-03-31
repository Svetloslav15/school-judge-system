import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Layout, Form, Input, Button, Typography} from 'antd';

const Register = () => {
    return (
        <Layout className='register-wrapper'>
            <Form className='form-div box-shadow'>
                <div className='text-center'>
                    <i className="fas fa-laptop-code text-white icon-huge"/>
                </div>
                <Typography.Title level={3}><span className="text-white">Регистрация за School Judge</span></Typography.Title>
                <Form.Item
                    name="firstName"
                    rules={[{required: true, message: 'Въведете име!'}]}
                >
                    <Input
                        placeholder='Име'
                        type='text'
                    />
                </Form.Item>
                <Form.Item
                    name="lastName"
                    rules={[{required: true, message: 'Въведете фамилия!'}]}
                >
                    <Input
                        placeholder='Фамилия'
                        type='text'
                    />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[{required: true, message: 'Въведете имейл!'}]}
                >
                    <Input
                        placeholder='Имейл'
                        type='email'
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
                        Регистрация
                    </Button>
                </Form.Item>
                <Typography.Text>
                    <div className='text-center'>
                        <span className='text-white'>Имате акаунт? </span>
                        <Link to='/login'>Вход</Link>
                    </div>
                </Typography.Text>
            </Form>
        </Layout>
    )
};

export default Register;