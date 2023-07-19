import { useEffect } from "react";
import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchSeesBooksEveryone } from "@/store/actions/fetchSeesBooksEveryone";
import BookshelfWrapper from "@/components/UI/wrappers/BookshelfWrapper";
import Book from "@/components/Library/Book";
import BookMessageForm from "@/components/Forms/BookMessageForm";

function LibraryPage() {
  const { booksSeesEveryone } = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSeesBooksEveryone());
  }, []);

  return (
    <main className={styles.mainBlockLibraryPage}>
      {booksSeesEveryone.length === 0 ? (
        <div className={styles.wrapper}>
          <h3>It's empty for now, come back later</h3>
        </div>
      ) : (
        <BookshelfWrapper>
          {booksSeesEveryone.map((book) => (
            <Book key={book.id} {...book} />
          ))}
          <BookMessageForm />
        </BookshelfWrapper>
      )}
    </main>
  );
}

export default LibraryPage;
