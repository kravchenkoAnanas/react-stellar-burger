import { ChangeEvent, FormEvent, useState } from 'react';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from './../../services/hooks';
import { loginUserAction } from './../../services/actions/user';
import loginStyle from './login.module.css';

function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('hazza99@mail.ru');
    const emailOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const [password, setPassword] = useState('test1234')
    const passwordOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginUserAction(email, password));
    };

    return (
    <>
        <form action="" onSubmit={ submit }>
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
                    <Button htmlType="submit" type="primary" size="large">
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
                        extraClass={ loginStyle.link_button }
                        onClick={ () => { navigate("/register"); } }
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
                        extraClass={ loginStyle.link_button }
                        onClick={ () => { navigate("/forgot-password"); } }  
                    >
                        Восстановить пароль
                    </Button>
                </div>
            </div>
        </form>
    </>
    );
}

export default LoginPage;
