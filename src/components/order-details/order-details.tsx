import styles from "./order-details.module.scss";

type TOrderNumber = {
  orderNumber: number;
};

export default function OrderDetails({ orderNumber }: TOrderNumber) {
  return (
    <div className={styles.orderAccepted}>
      <p className={`${styles.orderNumber} text text_type_digits-large pt-4`}>
        {orderNumber}
      </p>
      <p className="text text_type_main-medium pt-8">идентификатор заказа</p>
      <div className={`${styles.statusIcon} mt-16 pt-16`}></div>
      <p className="text text_type_main-default pt-15">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive pt-2">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}
