import { useState, useRef, useEffect } from 'react';
import Header from "../../components/header/header";
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { registerUser, catchError, getUser, updateUser } from './../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '../../utils/cookie';
import { updateUserAction } from '../../services/actions/user';


function ProfilePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { accessToken } = useSelector(state => state.user);

    const [isEditMode, setIsEditMode] = useState(false);

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

    const setupUser = (name, email) => {
        console.log("getUser(accessToken) DONE")
        setName(name);
        setEmail(email);
    };

    useEffect(() => {
        if (accessToken.length === 0) {
            console.log("updateUser(getCookie('token'));");
            dispatch(updateUserAction(getCookie('token')));
        }
        getUser(accessToken)
            .then(res => {
                if (res.success) {
                    console.log("setupUser", res);
                    setupUser(res.user.name, res.user.email);
                }
            })
            // .catchError()
    }, [accessToken]);

    const submitCancel = () => {
        setIsEditMode(false);
    };
    const submitSave = () => {
        setIsEditMode(false);
        console.log(name, email);
    };

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
                        onClick={ () => setIsEditMode(true) }
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
                        onClick={ () => setIsEditMode(true) }
                        />
                </div>
                <div className="mt-6">
                <PasswordInput
                    value={"dummy"}
                    name={'password'}
                    extraClass="mb-2"
                    icon='EditIcon'
                    onClick={ () => setIsEditMode(true) }
                />
                </div>
                { isEditMode &&
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'right'
                        }}
                        className="mt-6 mb-6"
                    >
                        <Button htmlType="button" type="secondary" size="large" onClick={submitCancel}>
                            Отмена
                        </Button>
                        <Button htmlType="button" type="primary" size="large" onClick={submitSave}>
                            Сохранить
                        </Button>
                    </div>
                }
            </div>
        </div>
    </>
    );
}

export default ProfilePage;
