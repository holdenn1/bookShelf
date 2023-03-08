import {createBrowserRouter} from 'react-router-dom'
import App from "../App";
import HomePage from "../pages/HomePage/HomePage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import SignUpPage from "../pages/RegistrationPages/SignUpPage";
import SignInPage from "../pages/RegistrationPages/SignInPage";
import BookshelfPage from "../pages/BookshelfPage/BookshelfPage";
import AllBookPage from "../pages/AccountPages/AllBookPage";
import NewBookPage from "../pages/AccountPages/NewBookPage";
import FavoriteBooksPage from "../pages/AccountPages/FavoriteBooksPage";
import LibraryPage from "../pages/LibraryPage/LibraryPage";

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
        path: 'library',
        element: <LibraryPage/>
      },
      {
        path: 'book-shelf',
        element: <BookshelfPage/>,
        children: [
          {
            path: 'new-book',
            element: <NewBookPage/>
          },
          {
            path: 'all-books',
            element: <AllBookPage/>
          },
          {
            path: 'favorite-books',
            element: <FavoriteBooksPage/>
          },
        ]
      },
    ]
  }
])