import { useState, useRef } from 'react';
import Header from "../../../components/header/header";
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { resetPassword, catchError } from './../../../services/api';

function ResetPasswordPage() {
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
	const [code, setCode] = useState('');

	const clickResetButton = () => {
		console.log(`clickResetButton password=${password} code=${code}`);
		resetPassword(password, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Mjk1YThjNmQyOTk3MDAxY2FiMjJlYiIsImlhdCI6MTY5NzIwODk3MiwiZXhwIjoxNjk3MjEwMTcyfQ.M6fjsqxeXG43jLAFxYSVxrlBAq5TelKdSZtMcitm-Ck")
			.then((res) => {
				if (res.success) {
					console.log(res);
					// navigate("/");
				}
			})
			.catch(catchError)
	};

    return (
    <>
        <Header />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
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
			<div className="mt-20 mb-4" style={{ display: 'flex', flexDirection: 'row', alignItems: "center", gap: "1em" }}>
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

