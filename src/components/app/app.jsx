import MainPage from './../../pages/main/main';
import LoginPage from './../../pages/login/login';
import RegisterPage from './../../pages/register/register';
import ForgotPasswordPage from './../../pages/password/forgot/forgot';
import ResetPasswordPage from './../../pages/password/reset/reset';
import ProfilePage from './../../pages/profile/profile';
import IngredientPage from './../../pages/ingredient/ingredient';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<MainPage />} /> // главная страница, конструктор бургеров.
				<Route path="/login" element={<LoginPage />} /> // страница авторизации.
				<Route path="/register" element={<RegisterPage />} /> // страница регистрации.
				<Route path="/forgot-password" element={<ForgotPasswordPage />} /> // страница восстановления пароля.
				<Route path="/reset-password" element={<ResetPasswordPage />} /> // страница сброса пароля.
				<Route path="/profile" element={<ProfilePage />} /> // страница с настройками профиля пользователя.
				<Route path="/ingredients">
					<Route path=":id" element={<IngredientPage />} /> // страница ингредиента. 
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
