import { useAppDispatch } from "@/hooks/reduxHooks";
import styles from "./styles.module.scss";
import { IChildren } from "@/types";
import { setVisibleMenu } from "@/store/slices/mainSlice";

function MessagePageWrapper({ children }: IChildren) {
  const dispatch = useAppDispatch();
  return (
    <div
      onClick={() => dispatch(setVisibleMenu(false))}
      className={styles.wrapper}
    >
      {children}
    </div>
  );
}

export default MessagePageWrapper;
