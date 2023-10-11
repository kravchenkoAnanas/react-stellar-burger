import { useState, useRef } from 'react';
import Header from "../../components/header/header";
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const navigate = useNavigate();

    const [name, setName] = useState('name');
    const inputRef = useRef(null);
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    };

    const [email, setEmail] = useState('test@example.com');
    const emailOnChange = e => {
        setEmail(e.target.email)
    };

    const [password, setPassword] = useState('password')
    const passwordOnChange = e => {
        setPassword(e.target.password)
    }

    return (
    <>
        <Header />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
            <h1 className="text text_type_main-medium mt-25"> 
                Регистрация
            </h1>
            <div className="mt-6">
                <Input
                    type={'text'}
                    placeholder={'placeholder'}
                    onChange={e => setName(e.target.name)}
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
                <Button htmlType="button" type="primary" size="large">
                    Зарегистрироваться
                </Button>
            </div>
            <div className="mt-20 mb-4" style={{ display: 'flex', flexDirection: 'row', alignItems: "center", gap: "1em" }}>
                <p className="text text_type_main-default text_color_inactive">
                    Уже зарегистрированы?
                </p>
                <Button
                    htmlType="button"
                    type="secondary"
                    size="medium"
                    style={{ padding: "0px" }}
                    onClick={ e => { navigate("/login"); } }
                >
                    Войти
                </Button>
            </div>
        </div>
    </>
    );
}

export default RegisterPage;

