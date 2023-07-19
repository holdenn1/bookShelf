import { ReactNode } from "react";
import "./styles.scss";



function SubmitButton({ title }: { title: string }) {
  return (
    <button type="submit" className="btn-type-submit">
      {title}
    </button>
  );
}

export default SubmitButton;
