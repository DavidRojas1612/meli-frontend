import { Outlet, useLoaderData } from "react-router";
import styles from "./layout.module.scss";

function LayoutItem() {
  const { results } = useLoaderData() as any;
  return (
    <section className={styles.contentContainer}>
      {results.categories && (
        <div className={styles.categoriesContainer}>
          {results.categories.map((category: any) => (
            <div key={category.id} className={styles.categoryPath}>
              {category.path_from_root.map((path: any) => (
                <span key={path.id} className={styles.pathSegment}>
                  {path.name}
                </span>
              ))}
            </div>
          ))}
        </div>
      )}
      <Outlet />
    </section>
  );
}

export default LayoutItem;
