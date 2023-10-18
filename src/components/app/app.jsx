import MainPage from './../../pages/main/main';
import LoginPage from './../../pages/login/login';
import RegisterPage from './../../pages/register/register';
import ForgotPasswordPage from './../../pages/password/forgot/forgot';
import ResetPasswordPage from './../../pages/password/reset/reset';
import ProfilePage from './../../pages/profile/profile';
import IngredientPage from './../../pages/ingredient/ingredient';
import OrdersPage from './../../pages/orders/orders';
import OrderPage from './../../pages/orders/order';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { OnlyAuth, OnlyUnAuth } from './../../components/protected-route';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { refreshUserAction, checkUserAuth } from '../../services/actions/user';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { UNSET_INGREDIENT } from '../../services/actions/ingredient_details_modal';
import ModalWrapper from '../modal/wrapper/wrapper';

function App() {

	const dispatch = useDispatch();
	const location = useLocation();
	
	const background = location.state && location.state.background;

    useEffect(() => {
        dispatch(checkUserAuth());
    }, []);

	return (
		<>
			<Routes location={background || location}>
				<Route path="/" element={<MainPage/>} /> 

				<Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />} /> // страница авторизации.
				<Route path="/register" element={<OnlyUnAuth component={<RegisterPage />} />} /> // страница регистрации.
				<Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage />} />} /> // страница восстановления пароля.
				<Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage />} />} /> // страница сброса пароля.

				<Route path="/profile" element={<OnlyAuth component={<ProfilePage/>} />} /> 
				<Route path="/profile/orders" element={<OnlyAuth component={<OrdersPage/>} />} /> 
				<Route path="/profile/orders/:id" element={<OnlyAuth component={<OrderPage/>} />} /> 

				<Route path="/ingredients">
					<Route path=":id" element={<IngredientPage />} /> // страница ингредиента. 
				</Route>
			</Routes>

			{background && (
				<Routes>
					<Route
						path='/ingredients/:ingredientId'
						element={<ModalWrapper />}
					/>
				</Routes>
			)}
		</>
	);
}
// Страница 404 на своё усмотрение.

export default App;
