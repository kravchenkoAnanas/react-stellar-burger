import MainPage from './../../pages/main/main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<MainPage />} />
			</Routes>
		</Router>
	);
}

export default App;
