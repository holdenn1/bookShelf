import React from 'react';
import styles from './styles.module.scss'
import {FieldHookConfig, useField} from 'formik'

interface TextInputProps {
  label: string
  [key: string]: any
}

export default function MyTextInput({label, ...props}: TextInputProps & FieldHookConfig<string>) {
  const [field, meta] = useField(props);
  return (
    <>
      <label className={styles.label} htmlFor={props.name}>{label}</label>
      <input className={styles.input} type={props.type} placeholder={props.placeholder} {...field}/>
      {meta.touched && meta.error ? (
        <p className={styles.formError}>{meta.error}</p>
      ) : null}
    </>
  );
}


