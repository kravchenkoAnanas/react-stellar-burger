import { useState, useRef } from 'react';
import Header from "../../../components/header/header";
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { forgotPassword, catchError } from './../../../services/api';

function ForgotPasswordPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const emailOnChange = e => {
		const label = e.target.parentElement.querySelector("label");
		const value = e.target.value;
		setEmail(value);

		if (value.length) {
			label.style = "display: none";
			e.target.style = "margin-bottom: 1em;";
		} else {
			label.style = "";
			e.target.style = "";
		}
    };

	const clickForgotButton = () => {
		// console.log(`clickForgotButton ${email}`);
		forgotPassword(email)
			.then((res) => {
				if (res.success) {
					// console.log(res);
					navigate("/reset-password", { state: 'from-forgot' });
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
                <EmailInput
                    placeholder="Укажите e-mail"
                    onChange={emailOnChange}
                    value={email}
                    name={'email'}
                    isIcon={false}
                    />
            </div>
			<div className="mt-6 mb-6">
                <Button htmlType="button" type="primary" size="large" onClick={clickForgotButton}>
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

export default ForgotPasswordPage;

