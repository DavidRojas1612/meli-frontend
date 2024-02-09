import { Search } from "lucide-react";
import styles from "./index.module.scss";

function IndexRoot() {
  return (
    <div className={styles.emptyState}>
      <Search className={styles.searchIcon} />
      <h2 className={styles.title}>Comienza a buscar</h2>
      <p className={styles.description}>
        Introduce un término de búsqueda para empezar
      </p>
    </div>
  );
}

export default IndexRoot;
