import { useEffect } from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import Library from "@/components/Library";
import { useAuth } from "@/hooks/useAuth";

function BookshelfPage() {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    !isAuth && navigate("/", { replace: true });
  }, []);

  return (
    <main className={styles.mainBlockBookShelfPage}>
      <Library />
    </main>
  );
}

export default BookshelfPage;
