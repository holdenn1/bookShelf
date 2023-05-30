import React from 'react';
import { ErrorMessage, Field } from 'formik';
import descriptionBook from '../../../../img/icons/icons8-open-book-100.png';
import styles from './styles.module.scss';
import classNames from 'classnames';

interface IBookDescription {
	errors?: {
		[key: string]: string;
	};
}

export default function BookDescription({ errors }: IBookDescription) {
	return (
		<>
			<img className={styles.img} src={descriptionBook} alt='' />
			<h3 className={styles.title}>What can you say about this book?</h3>
			<Field
				name='description'
				as='textarea'
				className={classNames(styles.descriptionBook, { [styles.error]: errors?.description })}
			/>
			<p className={styles.errorMassage}>
				<ErrorMessage name='description' />
			</p>
		</>
	);
}
