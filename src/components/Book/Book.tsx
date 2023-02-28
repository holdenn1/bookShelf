import React from 'react';
import styles from './Book.module.scss'

import {useAppSelector} from "../../hooks/reduxHooks";
import PreviewCover from "./PreviewCover";

function Book() {
    const {library} = useAppSelector(state => state.account)

    return (
        <>{
            library.map(book => (
                <div key={book.id} className={styles.card}>
                    <div className={styles.front}><PreviewCover file={book.cover}/></div>
                    <div className={styles.back}>
                        <h3 className={styles.title}>{book.title}</h3>
                        <p className={styles.description}>{book.description}</p>
                    </div>
                </div>
            ))
        }</>
        /*       <div className={styles.card}>
                   <div className={styles.front}><img src={cover}/></div>
                   <div className={styles.back}>
                       <h3 className={styles.title}>The Dark Tower</h3>
                       <p className={styles.description}>The best book</p>
                   </div>
               </div>*/

    );
}

export default Book;