import React from 'react';
import AddingBook from "../../components/AddingBook/AddingBook";
import FormAddingBook from "../../components/FormAddingBook/FormAddingBook";
import {useAppSelector} from "../../hooks/reduxHooks";
import Book from "../../components/Book/Book";
import BookshelfWrapper from "../../components/UI/BookshelfWrapper/BookshelfWrapper";

function AllBookPage() {
    const {library} = useAppSelector(state => state.account)

    return (
        <>
            {
                library.length === 0 ? (
                        <>
                            <AddingBook title='It`s still empty here'/>
                            <FormAddingBook/>
                        </>
                    )
                    : (
                        <BookshelfWrapper>
                            <Book/>
                        </BookshelfWrapper>
                    )
            }
        </>


    );
}

export default AllBookPage;