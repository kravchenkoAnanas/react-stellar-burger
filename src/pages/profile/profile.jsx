import { useState, useRef, useEffect } from 'react';
import Header from "../../components/header/header";
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '../../utils/cookie';
import { refreshUserAction, updateUserAction, getUserAction, logoutUserAction } from '../../services/actions/user';
import profileStyle from './profile.module.css';


function ProfilePage() {
    const dispatch = useDispatch();

    const [isEditMode, setIsEditMode] = useState(false);
    const { user } = useSelector(state => state.user);

    let name = '';
    let email = '';
    if (user) {
        name = user.name;
        email = user.email;
    };

    const [nameState, setNameState] = useState(name);
    const inputRef = useRef(null);
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    };
 
    const [emailState, setEmailState] = useState(email);
    const emailOnChange = e => {
        setEmailState(e.target.value)
    };

    const submitCancel = () => {
        setIsEditMode(false);
        setNameState(name);
        setEmailState(email);
    };
    const submitSave = () => {
        setIsEditMode(false);
        const toEdit = {};
        // console.log(nameState, emailState);
        if (nameState !== name) {
            toEdit['name'] = nameState;
        }
        if (emailState !== email) {
            toEdit['name'] = emailState;
        }
        if (Object.keys(toEdit).length) {
            console.log(toEdit);
            dispatch(updateUserAction(toEdit));
        }
    };

    const submitExit = () => {
        dispatch(logoutUserAction());
    };

    return (
    <>
        <Header />
        <div className={ profileStyle.profile }>
            <div className={ profileStyle.profile_left }>
                <div className={ profileStyle.profile_nav }>
                    <p className="text text_type_main-medium">
                        Профиль
                    </p>
                    <a href="/not_found" className={ profileStyle.link }>
                        {/* // profile/orders */}
                        <p className="text text_type_main-medium text_color_inactive">
                            История заказов
                        </p>
                    </a>
                    <Link onClick={submitCancel} className={ profileStyle.link } >
                        <p className="text text_type_main-medium text_color_inactive" onClick={ submitExit }>
                            Выход
                        </p>
                    </Link>

                </div>
                <p className="text text_type_main-default text_color_inactive">
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </div>
            <div className={ profileStyle.profile_input }>
                <div>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={e => setNameState(e.target.value)}
                        value={nameState}
                        name={'nameState'}
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
                        value={emailState}
                        name={'emailState'}
                        isIcon={false}
                        placeholder='Логин'
                        icon='EditIcon'
                        onClick={ () => setIsEditMode(true) }
                        />
                </div>
                <div className="mt-6">
                <PasswordInput
                    value={"*****"}
                    name={'password'}
                    extraClass="mb-2"
                    icon='EditIcon'
                    onClick={ () => setIsEditMode(false) }
                />
                </div>
                { isEditMode &&
                    <div className={ profileStyle.profile_edit }>
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
