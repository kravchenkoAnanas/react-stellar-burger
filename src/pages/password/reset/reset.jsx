import { useState, useRef, useEffect } from 'react';
import Header from "../../../components/header/header";
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useNavigate } from 'react-router-dom';
import resetStyle from './reset.module.css';
// import { resetPassword, catchError } from './../../../services/api';

function ResetPasswordPage() {
    const navigate = useNavigate();
    const location = useLocation();

    // console.log("ResetPasswordPage location", location);

    useEffect(() => {
        if (!location.state) {
            navigate('/forgot-password');
        }
    }, [])

    const [password, setPassword] = useState('');
	const [code, setCode] = useState('');

	const clickResetButton = () => {
		// console.log(`clickResetButton password=${password} code=${code}`);
		// resetPassword(password)
		// 	.then((res) => {
		// 		if (res.success) {
		// 			console.log(res);
		// 		}
		// 	})
		// 	.catch(catchError)
        navigate("/");
	};

    return (
    <>
        <Header />
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
            <Button htmlType="button" type="primary" size="large" onClick={clickResetButton}>
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

export default ResetPasswordPage;

