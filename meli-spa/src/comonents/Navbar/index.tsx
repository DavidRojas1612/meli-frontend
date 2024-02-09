import { Search } from "lucide-react";
import { FormEventHandler, useRef } from "react";
import { useNavigate } from "react-router";

import styles from "./styles.module.scss";

function Navbar() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get("query") ?? "";

    const search = new URLSearchParams([["search", query?.toString()]]);
    navigate(`/items?${search.toString()}`);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div>
          <a href="/" className={styles.logoContainer}>
            Mercado Libre Colombia - Donde comprar y vender de todo
          </a>
        </div>
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <label htmlFor="query" className={styles.searchLabel}>
            search label
          </label>
          <input
            ref={inputRef}
            type="text"
            name="query"
            id="query"
            className={styles.searchInput}
          />
          <button
            className={styles.searchButton}
            type="submit"
            onClick={(e) => {
              if (!inputRef.current?.value) {
                e.preventDefault();
                e.stopPropagation();
                inputRef.current?.focus();
              }
            }}
          >
            <Search strokeWidth={1} className={styles.searchIcon} />
          </button>
        </form>
      </nav>
    </header>
  );
}

export default Navbar;
