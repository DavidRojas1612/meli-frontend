import { Outlet } from "react-router";
import Navbar from "../comonents/Navbar";
import styles from "./root.module.scss";

function Root() {
  return (
    <main>
      <Navbar />
      <div className={styles.mainContainer}>
        <Outlet />
      </div>
    </main>
  );
}

export default Root;
