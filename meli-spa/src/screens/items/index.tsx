import { Car } from "lucide-react";
import { Link, useRouteLoaderData } from "react-router-dom";
import { cuyrrencyFormatter } from "../../utils";
import styles from "./index.module.scss";

function IndexItem() {
  const data = useRouteLoaderData("items") as any;

  return (
    <ul className={styles.productList}>
      {data?.results.items.map((item: any) => (
        <li key={item.id} className={styles.itemContainer}>
          <Link className={styles.item} to={item.id}>
            <picture>
              <img src={item.picture} alt={item.title} className={styles.img} />
            </picture>
            <div>
              <div className={styles.info}>
                <h2 className={styles.price}>
                  {cuyrrencyFormatter(item.price.currency, item.price.amount)}
                </h2>
                {item.free_shipping ? (
                  <div className={styles.svg} aria-description="free shipping">
                    <Car width={15} />
                  </div>
                ) : null}
              </div>
              <h3 className={styles.title}>{item.title}</h3>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default IndexItem;
