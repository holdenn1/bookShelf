import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function App() {
	return (
		<>
			<ToastContainer />
			<Header />
			<Main>
				<Outlet />
			</Main>
			<Footer />
		</>
	);
}

export default App;
