import MainPage from './../../pages/main/main';
import LoginPage from './../../pages/login/login';
import RegisterPage from './../../pages/register/register';
import ForgotPasswordPage from './../../pages/password/forgot/forgot';
import ResetPasswordPage from './../../pages/password/reset/reset';
import ProfilePage from './../../pages/profile/profile';
import IngredientPage from './../../pages/ingredient/ingredient';
import OrdersPage from './../../pages/orders/orders';
import OrderPage from './../../pages/orders/order';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OnlyAuth, OnlyUnAuth } from './../../components/protected-route';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { refreshUserAction, checkUserAuth } from '../../services/actions/user';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("App useEffect(() => {");
        dispatch(checkUserAuth());
    }, []);

	return (
		<Router>
			<Routes>
				<Route path="/" element={<OnlyAuth component={<MainPage/>} />} /> 

				<Route path="/login" element={<LoginPage />} /> // страница авторизации.
				<Route path="/register" element={<RegisterPage />} /> // страница регистрации.

				<Route path="/forgot-password" element={<ForgotPasswordPage />} /> // страница восстановления пароля.
				<Route path="/reset-password" element={<ResetPasswordPage />} /> // страница сброса пароля.

				<Route path="/profile" element={<ProfilePage />} />
				<Route path="/profile/orders" element={<OrdersPage />} />
				<Route path="/profile/orders/:id" element={<OrderPage />} />

				<Route path="/ingredients">
					<Route path=":id" element={<IngredientPage />} /> // страница ингредиента. 
				</Route>
			</Routes>
		</Router>
	);
}
// Страница 404 на своё усмотрение.

export default App;
