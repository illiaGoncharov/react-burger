import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";

import styles from "./FeedList.module.css";

const FeedList = ({ props }) => {
  const ingredientsData = useSelector((store) => store.ingredients.ingredients);

  const elements = props.ingredients
    .map((ingredient) => ingredientsData.find((el) => el._id === ingredient))
    .filter((e) => e !== undefined);

  const price = elements
    .map((item) => item.price)
    .reduce((accumulator, itemPrice) => itemPrice + accumulator, 0);

  return !elements ? null : (
    <div className={styles.list_element}>
      <div className={`mb-6 ${styles.list_element__details}`}>
        <p className="text text_type_digits-default">#{props.number}</p>
        <p className="text text_type_main-default text_color_inactive">{props.createdAt}</p>
      </div>
      <p className={`text text_type_main-medium mb-6 ${styles.list_element__name}`}>{props.name}</p>
      <div className={styles.list_element__details}>
        {elements.slice(0, 6).map((idIngredient, index) => (
          <div className={styles.list_element__imageContainer} data-count={`+${elements.slice(6).length}`} key={index}>
            <img src={idIngredient.image} alt="Ингредиент" className={styles.list_element__image} />
          </div>
        ))}
        <div className={styles.list_element__price}>
          <p className="mr-2 text text_type_digits-default">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default FeedList;
