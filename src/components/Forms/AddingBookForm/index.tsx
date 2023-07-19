import { useState } from "react";
import { Formik, Form } from "formik";
import BookCover from "./steps/BookCover";
import BookDescription from "./steps/BookDescription";
import BookTitle from "./steps/BookTitle";
import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import addingBookValidateSchema from "@/utils/validate/addingBookValidateSchema";
import { uploadBook } from "@/store/actions/uploadBook";
import { setVisibleAddingBookForm } from "@/store/slices/mainSlice";
import classNames from "classnames";
import WrapperFormAddingBook from "@/components/UI/wrappers/WrapperFormAddingBook";
import NavigateForm from "./NavigateForm/NavigateForm";
import { useNavigate } from "react-router-dom";

export interface IValues {
  title: string;
  description: string;
  cover: any;
  seesEveryone: boolean;
}

export default function AddingBookForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const { visibleAddingBookForm } = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.account);
  const currentValidationSchema = addingBookValidateSchema[step];
  const stepsComponents = [BookTitle, BookDescription, BookCover];
  const navigate = useNavigate()

  const renderSteps = (props: any) => {
    const Component = stepsComponents[step];
    return <Component {...props} />;
  };

  const handleSubmit = (values: IValues, resetForm: any) => {
    const data: IValues = { ...formData, ...values };
    setStep(step + 1);
    if (step === stepsComponents.length - 1) {
      dispatch(uploadBook({ data, user,navigate }));
      dispatch(setVisibleAddingBookForm(false));
      setStep(0);
      resetForm();
    }
  };

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        cover: "",
        seesEveryone: false,
      }}
      validationSchema={currentValidationSchema}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values, resetForm);
      }}
    >
      {(props) => (
        <Form
          className={classNames(styles.wrapper, {
            [styles.activeForm]: visibleAddingBookForm,
          })}
        >
          <WrapperFormAddingBook>
            {renderSteps(props)}
            <NavigateForm step={step} setStep={setStep} />
          </WrapperFormAddingBook>
        </Form>
      )}
    </Formik>
  );
}
