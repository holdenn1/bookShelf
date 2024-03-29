import styles from "./styles.module.scss";
import coverBook from "@/img/icons/icons8-book-96.png";
import { ErrorMessage, Field } from "formik";

interface IFormikProps {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

export default function BookCover({ setFieldValue }: IFormikProps) {
  return (
    <>
      <img src={coverBook} alt="" style={{marginTop: '10px'}}/>
      <h3 className={styles.title}>Add a cover!</h3>
      <p className={styles.titleDescription}>
        It will make your library more convenient and stylish!
      </p>
      <p className={styles.instruction}>Click on the book</p>
      <div className={styles.checkboxContainer}>
        <label htmlFor="seesEveryone">
          Share with everyone
          <Field
            id="seesEveryone"
            name="seesEveryone"
            type="checkbox"
            className={styles.checkbox}
          />
        </label>
      </div>
      <p className={styles.errorMassage}>
        <ErrorMessage name="cover" />
      </p>
      <input
        type="file"
        name="cover"
        onChange={(e) => {
          setFieldValue("cover", e.target.files?.[0]);
        }}
        className={styles.addCover}
      />
    </>
  );
}
