import {createBrowserRouter} from 'react-router-dom'
import App from "../App";
import HomePage from "../pages/HomePage/HomePage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import BookshelfPage from "../pages/BookshelfPage/BookshelfPage";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <HomePage/>
      },
      {
        path: 'sign-up',
        element: <SignUpPage/>
      },
      {
        path: 'sign-in',
        element: <SignInPage/>
      },
      {
        path: 'book-shelf',
        element: <BookshelfPage/>
      },
    ]
  }
])