import Header from '../header/header';
import MainPage from '../../pages/main/main';
import LoginPage from '../../pages/login/login';
import RegisterPage from '../../pages/register/register';
import ForgotPasswordPage from '../../pages/password/forgot/forgot';
import ResetPasswordPage from '../../pages/password/reset/reset';
import ProfilePage from '../../pages/profile/profile';
import IngredientPage from '../../pages/ingredient/ingredient';
import OrdersPage from '../../pages/orders/orders';
import OrderPage from '../../pages/order/order-page';
import FeedPage from '../../pages/feed/feed';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { OnlyAuth, OnlyUnAuth } from '../protected-route';
import { useSelector, useDispatch } from './../../services/hooks';
import { useEffect } from 'react';
import { checkUserAuth } from '../../services/actions/user';
import ModalWrapper from '../modal/wrapper/wrapper';
import NotFound404 from '../../pages/not_found/not_found';
import { getIngredients } from '../../services/actions/ingredients';

function App() {
	const dispatch = useDispatch();
	const location = useLocation();
	
	const background = location.state && location.state.background;

    useEffect(() => {
        dispatch(checkUserAuth());
		dispatch(getIngredients());
    }, []);

	return (
		<>
			<Header />
			<Routes location={background || location}>
				<Route path="/" element={<MainPage/>} /> 

				<Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
				<Route path="/register" element={<OnlyUnAuth component={<RegisterPage />} />} />
				<Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
				<Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage />} />} />

				<Route path="/profile" element={<OnlyAuth component={<ProfilePage/>} />} /> 
				<Route path="/profile/orders" element={<OnlyAuth component={<OrdersPage/>} />} /> 
				<Route path="/profile/orders/:id" element={<OnlyAuth component={<OrderPage/>} />} /> 

				<Route path="/ingredients">
					<Route path=":id" element={<IngredientPage />} />
				</Route>

				<Route path="*" element={ <NotFound404 /> }/>

				<Route path="/feed" element={<FeedPage/>} />
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

export default App;
