import { FC } from "react";

import styles from "./loader.module.css";

const Loader: FC = () => {
  return (
    <div className={styles.loader}>
      <h2 className={`text text_type_main-medium ${styles.loading}`}>
        Подождите, идет создание заказа...
      </h2>
    </div>
  );
};

export default Loader;
