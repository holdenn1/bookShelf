import App from '@/App';
import ChatWindow from '@/components/Library/Chat/ChatWindow';
import {
  AllBookPage,
  BookshelfPage,
  ErrorPage,
  FavoriteBooksPage,
  HomePage,
  LibraryPage,
  MessagesPage,
  NewBookPage,
  SignInPage,
  SignUpPage,
} from '@/pages';
import { createHashRouter } from 'react-router-dom';

export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'sign-up',
        element: <SignUpPage />,
      },
      {
        path: 'sign-in',
        element: <SignInPage />,
      },
      {
        path: 'library',
        element: <LibraryPage />,
      },
      {
        path: 'book-shelf',
        element: <BookshelfPage />,
        children: [
          {
            path: 'new-book',
            element: <NewBookPage />,
          },
          {
            path: 'all-books',
            element: <AllBookPage />,
          },
          {
            path: 'favorite-books',
            element: <FavoriteBooksPage />,
          },
          {
            path: 'messages',
            element: <MessagesPage />,
            children: [
              {
                path: `:chatId`,
                element: <ChatWindow />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
