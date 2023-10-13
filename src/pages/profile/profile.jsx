import { useState, useRef } from 'react';
import Header from "../../components/header/header";
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { registerUser, catchError } from './../../services/api';

function ProfilePage() {
    const navigate = useNavigate();

    const [name, setName] = useState('nastya');
    const inputRef = useRef(null);
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    };

    const [email, setEmail] = useState('anastasiaa.kravchenkoo@gmail.com');
    const emailOnChange = e => {
        setEmail(e.target.value)
    };

    const [password, setPassword] = useState('nastya12345')
    const passwordOnChange = e => {
        setPassword(e.target.value)
    }

    return (
    <>
        <Header />
        <div className="mt-30" style={{ 
            display: 'flex',
            flexDirection: 'row',
            justifyContent: "center",
            gap: '60px',
        }}>
            <div className="mt-5 mb-20" style={{
                maxWidth: "320px" 
            }}>
                <div className="mt-5 mb-20" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: "top",
                    alignItems: "left",
                    gap: "2em",
                }}>
                    <p className="text text_type_main-medium">
                        Профиль
                    </p>
                    <a href="/profile/orders">
                        <p className="text text_type_main-medium text_color_inactive">
                            История заказов
                        </p>
                    </a>
                    <p className="text text_type_main-medium text_color_inactive">
                        Выход
                    </p>
                </div>
                <p className="text text_type_main-default text_color_inactive">
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: "center"
            }}>
                <div>
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
                        icon='EditIcon'
                        />
                </div>
                <div className="mt-6">
                    <EmailInput
                        onChange={emailOnChange}
                        value={email}
                        name={'email'}
                        isIcon={false}
                        placeholder='Логин'
                        icon='EditIcon'
                        />
                </div>
                <div className="mt-6">
                <PasswordInput
                    onChange={passwordOnChange}
                    value={password}
                    name={'password'}
                    extraClass="mb-2"
                    icon='EditIcon'
                    />
                </div>
            </div>
        </div>
    </>
    );
}

export default ProfilePage;
