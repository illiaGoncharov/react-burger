import React, { useState, useEffect } from "react";
import AppStyles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

function App() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ingredientsDATA, setIngerdientsDATA] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          "https://norma.nomoreparties.space/api/ingredients"
        );
        if (!res.ok) {
          throw new Error(`Error status - ${res.status}`);
        }
        const actualData = await res.json();
        setIngerdientsDATA(actualData.data);
        setError(null);
      } catch (error) {
        setError(error.message);
        setIngerdientsDATA([]);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div className="App">
      <AppHeader />
      <main className={`${AppStyles.main}`}>
        <BurgerIngredients ingredients={ingredientsDATA} />
        {/* <BurgerConstructor construct={ingredientsDATA} /> */}
      </main>
    </div>
  );
}

export default App;
