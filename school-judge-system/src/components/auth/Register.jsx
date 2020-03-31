import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Layout, Form, Input, Button, Typography, Row, Select, Text} from 'antd';
import {UserOutlined, MailOutlined} from '@ant-design/icons';

const Register = () => {
    return (
        <Layout className='register-wrapper'>
            <Form className='form-div box-shadow p-form'>
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
                            />
                        </Form.Item>
                        <Form.Item
                            name="class"
                            rules={[{required: true, message: 'Въведете клас!'}]}
                            className='mr-1'
                        >
                            <Input
                                placeholder='Клас - пример: 10А'
                                type='text'
                                prefix={<UserOutlined/>}
                            />
                        </Form.Item>
                    </Row>
                    <Form.Item compact className='role-select'>
                        <Select defaultValue="Роля">
                            <Select.Option value="student">Ученик</Select.Option>
                            <Select.Option value="teacher">Учител</Select.Option>
                        </Select>
                        <Typography.Text className='role-message'>
                            * Учителската роля изисква удобрение от администратор
                        </Typography.Text>
                    </Form.Item>
                    <Row>
                        <Form.Item
                            name="password"
                            rules={[{required: true, message: 'Въведете парола!'}]}
                            className='mr-1'
                        >
                            <Input.Password
                                placeholder='Парола'
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{required: true, message: 'Въведете повторно паролата!'}]}
                        >
                            <Input.Password
                                placeholder='Повторете паролата'
                            />
                        </Form.Item>
                    </Row>
                </div>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
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