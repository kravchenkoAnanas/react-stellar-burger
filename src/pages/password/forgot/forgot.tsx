import { useState, useRef } from 'react';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { forgotPassword, catchError } from '../../../services/api';
import forgotStyle from './forgot.module.css';

function ForgotPasswordPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const emailOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
		const label = target.parentElement?.querySelector("label");
		const value = target.value;
		setEmail(value);

		if (value.length) {
            if (label) {
                label.style.cssText = "display: none";
            }
			target.style.cssText = "margin-bottom: 1em;";
		} else {
            if (label) {
    			label.style.cssText = "";
            }
			target.style.cssText = "";
		}
    };

	const clickForgotButton = () => {
		forgotPassword(email)
			.then((res) => {
				if (res.success) {
					navigate("/reset-password", { state: 'from-forgot' });
				}
			})
			.catch(catchError)
	};
    
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        clickForgotButton();
    }

    return (
    <>
        <form action="" onSubmit={ submit }>
            <div className={ forgotStyle.forgot }>
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
                    <Button 
                        htmlType="submit" 
                        type="primary" 
                        size="large" 
                        > 
                        Восстановить
                    </Button>
                </div>
                <div className={ forgotStyle.recall }>
                    <p className="text text_type_main-default text_color_inactive">
                        Вспомнили пароль?
                    </p>
                    <Button
                        htmlType="button"
                        type="secondary"
                        size="medium"
                        extraClass={ forgotStyle.link_button }
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

export default ForgotPasswordPage;

