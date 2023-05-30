import React from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
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
