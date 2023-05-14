import IngredientDetailsCSS from './IngredientDetails.module.css';
import { useSelector } from 'react-redux';

function IngredientDetails() {

  const { selectedIngredient } = useSelector(store => store.modal);

  return (
    <>  
      <img
          className={IngredientDetailsCSS.image}
          src={selectedIngredient.image}
          alt={selectedIngredient.name}
      />

      <p className={"text text_type_main-medium mt-4 mb-8"}>
        {selectedIngredient.name}
      </p>

      <div>
        <ul className={IngredientDetailsCSS.list}>
          <li
            className={`${IngredientDetailsCSS.list__item} text text_type_main-default text_color_inactive`}
          >
            Калории,ккал
            <span className="text text_type_digits-default">
              {selectedIngredient.calories}
            </span>
          </li>

          <li
            className={`${IngredientDetailsCSS.list__item} text text_type_main-default text_color_inactive`}
          >
            Белки, г
            <span className="text text_type_digits-default">
              {selectedIngredient.proteins}
            </span>
          </li>

          <li
            className={`${IngredientDetailsCSS.list__item} text text_type_main-default text_color_inactive`}
          >
            Жиры, г
            <span className="text text_type_digits-default">
              {selectedIngredient.fat}
            </span>
          </li>

          <li
            className={`${IngredientDetailsCSS.list__item} text text_type_main-default text_color_inactive`}
          >
            Углеводы, г
            <span className="text text_type_digits-default">
              {selectedIngredient.carbohydrates}
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}

export default IngredientDetails;