import { useLoaderData } from "react-router";
import { cuyrrencyFormatter } from "../../utils";
import styles from "./itemid.module.scss";

function ItemId() {
  const { data } = useLoaderData() as any;

  return (
    <div className={styles.productDetail}>
      <div>
        <picture>
          <img src={data?.picture} alt={data?.title} className={styles.image} />
        </picture>
        <div>
          <h2 className={styles.title}>Descripción del producto</h2>
          <p className={styles.description}>{data?.description}</p>
        </div>
      </div>
      <div>
        <div className={styles.details}>
          <span>{data?.condition}</span>
          {"-"}
          <span>{data?.sold_cuantity} vendidos</span>
        </div>
        <h1 className={styles.productName}>{data?.title}</h1>
        <h2 className={styles.price}>
          {" "}
          {cuyrrencyFormatter(data?.price.currency, data?.price.amount)}
        </h2>
        <button className={styles.button}>comprar</button>
      </div>
    </div>
  );
}

export default ItemId;
