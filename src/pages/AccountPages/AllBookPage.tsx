import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { IBook } from "@/types";
import { fetchDataLibrary } from "@/store/actions/fetchDataLibrary";
import { setSearch } from "@/store/slices/mainSlice";
import LibraryTitle from "@/components/Library/LibraryTitle";
import BookshelfWrapper from "@/components/UI/wrappers/BookshelfWrapper";
import Book from "@/components/Library/Book";

function AllBookPage() {
  const { search } = useAppSelector((state) => state.main);
  const { user, library } = useAppSelector((state) => state.account);
  const [searchBooks, setSearchBooks] = useState<IBook[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDataLibrary(user.id));
    dispatch(setSearch(""));
  }, []);

  function librarySearch() {
    const books = library.filter((book) => {
      return book.title.toLowerCase().includes(search.toLowerCase());
    });
    setSearchBooks(books);
  }

  useEffect(() => {
    librarySearch();
  }, [search, library]);

  return (
    <>
      {library.length === 0 ? (
        <LibraryTitle />
      ) : (
        <BookshelfWrapper>
          {searchBooks.length === 0
            ? library.map((book) => <Book key={book.id} {...book} />)
            : searchBooks.map((book: IBook) => (
                <Book key={book.id} {...book} />
              ))}
        </BookshelfWrapper>
      )}
    </>
  );
}

export default AllBookPage;
