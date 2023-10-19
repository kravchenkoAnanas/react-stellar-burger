import { useState, useRef } from 'react';
import Header from "../../components/header/header";
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginUserAction } from './../../services/actions/user';
import loginStyle from './login.module.css';

function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('hazza99@mail.ru');
    const emailOnChange = e => {
        setEmail(e.target.value);
    };

    const [password, setPassword] = useState('test1234')
    const passwordOnChange = e => {
        setPassword(e.target.value);
    };

    const submit = () => {
        dispatch(loginUserAction(email, password));
    };

    return (
    <>
        <Header />
        <div className={ loginStyle.login } >
            <h1 className="text text_type_main-medium mt-25"> 
                Вход
            </h1>
            <div className="mt-6">
                <EmailInput
                    onChange={emailOnChange}
                    value={email}
                    name={'email'}
                    isIcon={false}
                    />
            </div>
            <div className="mt-6">
            <PasswordInput
                onChange={passwordOnChange}
                value={password}
                name={'password'}
                extraClass="mb-2"
                />
            </div>
            <div className="mt-6 mb-6">
                <Button htmlType="button" type="primary" size="large" onClick={ submit }>
                    Войти
                </Button>
            </div>
            <div className={ loginStyle.register } >
                <p className="text text_type_main-default text_color_inactive">
                    Вы — новый пользователь?
                </p>
                <Button
                    htmlType="button"
                    type="secondary"
                    size="medium"
                    style={{ padding: "0px" }}
                    onClick={ e => { navigate("/register"); } }
                >
                    Зарегистрироваться
                </Button>
            </div>
            <div className={ loginStyle.forgot_password }>
                <p className="text text_type_main-default text_color_inactive">
                    Забыли пароль?
                </p>
                <Button
                    htmlType="button"
                    type="secondary"
                    size="medium"
                    style={{ padding: "0px" }}
                    onClick={ e => { navigate("/forgot-password"); } }  
                >
                    Восстановить пароль
                </Button>
            </div>
        </div>
    </>
    );
}

export default LoginPage;
