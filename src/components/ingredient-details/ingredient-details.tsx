import { FC } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./ingredient-details.module.css";

import IngredientDetailsMain from "../ingredient-details-main/ingredient-details-main";

import { TModalProps } from "../../utils/types";

interface IIngredientDetailsProps extends TModalProps {}

const IngredientDetails: FC<IIngredientDetailsProps> = ({ closeModal }) => {
  return (
    <div className={styles.main}>
      <div className={styles.block}>
        <h2 className="text text_type_main-large">Детали ингредиента</h2>
        <button className={styles.button} onClick={closeModal} type="button">
          <CloseIcon type="primary" />
        </button>
      </div>
      {/* Компонент с основной информацией о ингредиенте */}
      <IngredientDetailsMain />
    </div>
  );
};

export default IngredientDetails;
