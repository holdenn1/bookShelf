import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import { Provider } from 'react-redux';
import { store } from './store';
import './firebase';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);
