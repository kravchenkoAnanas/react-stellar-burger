import { useState, useRef } from 'react';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { registerUserAction } from '../../services/actions/user';
// import { useDispatch, useSelector } from 'react-redux';
import { useSelector, useDispatch } from './../../services/hooks';
import registerStyle from './register.module.css';


function RegisterPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const nameOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        setName((e.target as HTMLInputElement).value)
    };
    const inputRef = useRef<HTMLInputElement>(null);
    const onIconClick = () => {
        setTimeout(() => inputRef.current?.focus(), 0)
        alert('Icon Click Callback')
    };

    const [email, setEmail] = useState('');
    const emailOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        setEmail((e.target as HTMLInputElement).value)
    };

    const [password, setPassword] = useState('')
    const passwordOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        setPassword((e.target as HTMLInputElement).value)
    }

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(registerUserAction(email, password, name));
    }

    return (
    <>
        <form action="" onSubmit={ submit }>
            <div className={ registerStyle.register }>
                <h1 className="text text_type_main-medium mt-25"> 
                    Регистрация
                </h1>
                <div className="mt-6">
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={nameOnChange}
                        value={name}
                        name={'name'}
                        error={false}
                        ref={inputRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="ml-1"
                    />
                </div>
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
                        Зарегистрироваться
                    </Button>
                </div>
                <div className={ registerStyle.login }>
                    <p className="text text_type_main-default text_color_inactive">
                        Уже зарегистрированы?
                    </p>
                    <Button
                        htmlType="button"
                        type="secondary"
                        size="medium"
                        extraClass={ registerStyle.link_button }
                        onClick={ () => { navigate("/login"); } }
                    >
                        Войти
                    </Button>
                </div>
            </div>
        </form>
    </>
    );
}

export default RegisterPage;

