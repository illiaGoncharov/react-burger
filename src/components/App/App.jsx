import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AppStyles from './App.module.css';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { getIngredients } from '../../services/actions/ingredientsActions';

function App() {
  const { ingredients, isLoading, isError } = useSelector(store => store.ingredients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={AppStyles.main}>
          <div>
            {isError &&
              <h1 className="text text_type_main-large m-25">Произошла ошибка при загрузке ингридиентов!</h1>
            }
            {isLoading &&
              <h1 className="text text_type_main-large m-25">Идёт загрузка ингридиентов...</h1>
            }
            {ingredients &&
              <BurgerIngredients />
            }
          </div>

          <BurgerConstructor />
        </main>
      </DndProvider>
    </>
  );
}

export default App;