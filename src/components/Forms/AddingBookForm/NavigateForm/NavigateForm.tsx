import MainButton from "@/components/UI/addingBookForm/Buttons/MainButton";
import styles from "./styles.module.scss";

import { INavButtons } from "@/types";
import SubmitButton from "@/components/UI/addingBookForm/Buttons/SubmitButton";

function NavigateForm({ step, setStep }: INavButtons) {
  const handlePrev = () => {
    setStep(step - 1);
  };
  return (
    <div className={styles.buttonContainer}>
      {step > 0 && (
        <MainButton title="Prev" type="button" onClick={handlePrev} />
      )}
      {step === 0 || step <= 1 ? (
        <SubmitButton title="Next" />
      ) : (
        <SubmitButton title="Submit" />
      )}
    </div>
  );
}

export default NavigateForm;
