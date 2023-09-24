import styles from "./my-orders.module.scss"

export default function MyOrders() {
  return (
    <section className={styles.container}>
      <h1 className={`text text_type_main-large pt-10 pb-5`}>
        История заказов
      </h1>
    </section>
  );
}
