import React from 'react';
import styles from './styles.module.scss'
import {FieldHookConfig, useField} from 'formik'

interface TextInputProps {
	name: string
	type: string
	placeholder: string
  label: string
  [key: string]: any
}

export default function MyTextInput({label, type, placeholder, ...props}: TextInputProps & FieldHookConfig<string>) {
  const [field, meta] = useField(props);
  return (
    <>
      <label className={styles.label} htmlFor={props.name}>{label}</label>
      <input className={styles.input} type={type} placeholder={placeholder} {...field}/>
      {meta.touched && meta.error ? (
        <p className={styles.formError}>{meta.error}</p>
      ) : null}
    </>
  );
}


