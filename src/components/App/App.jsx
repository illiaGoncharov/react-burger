import { useState, useEffect, useCallback, useMemo } from "react";

import AppStyles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import IngredientsContext from "../../context/IngredientsContext"
import OrderContext from "../../context/OrderContext"

function App() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ingredientsDATA, setIngerdientsDATA] = useState([]);
  const [orderNumber, setOrderNumber] = useState(null);

  const handleErrors = (error) => {
    console.error('Что-то пошло не так:', error);
    setError(error.message);
  }

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('https://norma.nomoreparties.space/api/ingredients');
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      setIngerdientsDATA(data.data);
      setIsLoading(false);
    } catch (error) {
      handleErrors(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const memoizedIngredientsData = useMemo(() => ingredientsDATA, [ingredientsDATA]);

  return (
    <div className="App">
      <AppHeader />
      <main className={`${AppStyles.main}`}>
        <IngredientsContext.Provider value={memoizedIngredientsData}>
          <BurgerIngredients />
          <OrderContext.Provider value={{ orderNumber, setOrderNumber }}>
            <BurgerConstructor />
          </OrderContext.Provider>
        </IngredientsContext.Provider>
      </main>
    </div>
  );
}

export default App;
