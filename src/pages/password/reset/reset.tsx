import { useState, useEffect, FormEvent } from 'react';
import { PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useNavigate } from 'react-router-dom';
import resetStyle from './reset.module.css';
import { resetPasswordAction } from '../../../services/actions/user';
import { useSelector, useDispatch } from './../../../services/hooks';

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    // console.log("ResetPasswordPage location", location);

    useEffect(() => {
        if (!location.state) {
            navigate('/forgot-password');
        }
    }, [])

    const [password, setPassword] = useState('');
	const [code, setCode] = useState('');

	const clickResetButton = () => {
        dispatch(resetPasswordAction(password, code))
        navigate("/");
	};

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        clickResetButton();
    }

    return (
    <>
        <form action="" onSubmit={ submit }>
            <div className={ resetStyle.reset }>
                <h1 className="text text_type_main-medium mt-25"> 
                    Восстановление пароля
                </h1>
                <div className="mt-6">
                    <PasswordInput
                        placeholder="Введите новый пароль"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        name={'password'}
                        extraClass="mb-2"
                        />
                </div>
                <div className="mt-6">
                    <PasswordInput
                        placeholder="Введите код из письма"
                        onChange={e => setCode(e.target.value)}
                        value={code}
                        name={'code'}
                        extraClass="mb-2"
                    />
                </div>
                <div className="mt-6 mb-6">
                <Button htmlType="submit" type="primary" size="large">
                    Восстановить
                </Button>
            </div>
                <div className={ resetStyle.recall }>
                    <p className="text text_type_main-default text_color_inactive">
                        Вспомнили пароль?
                    </p>
                    <Button
                        htmlType="button"
                        type="secondary"
                        size="medium"
                        extraClass={ resetStyle.link_button }
                        onClick={ e => { navigate("/login"); } }
                    >
                        Войти
                    </Button>
                </div>
            </div>
        </form>
    </>
    );
}

export default ResetPasswordPage;
