import { useState, useRef } from 'react';
import Header from "../../components/header/header";
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { registerUserAction } from './../../services/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '../../utils/cookie';


function RegisterPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { accessToken } = useSelector(state => state.user);
    const { refreshToken } = getCookie('token');

    const [name, setName] = useState('');
    const inputRef = useRef(null);
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    };

    const [email, setEmail] = useState('');
    const emailOnChange = e => {
        setEmail(e.target.value)
    };

    const [password, setPassword] = useState('')
    const passwordOnChange = e => {
        setPassword(e.target.value)
    }

    const submit = () => {
        dispatch(registerUserAction(email, password, name));
    }

    return (
    <>
        <Header />

        <h3> accessToken { accessToken }</h3>
        <h3> refreshToken { refreshToken }</h3>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
            <h1 className="text text_type_main-medium mt-25"> 
                Регистрация
            </h1>
            <div className="mt-6">
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setName(e.target.value)}
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
                <Button htmlType="button" type="primary" size="large" onClick={submit}>
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

