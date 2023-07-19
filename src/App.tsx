import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function App() {
	return (
		<>
			<ToastContainer />
			<Header />
			
				<Outlet />
	
			<Footer />
		</>
	);
}

export default App;
