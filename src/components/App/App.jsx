import { useState, useEffect } from "react";
import AppStyles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import IngredientsContext from "../../context/IngredientsContext"

function App() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ingredientsDATA, setIngerdientsDATA] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://norma.nomoreparties.space/api/ingredients');
        const data = await response.json();
        setIngerdientsDATA(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <AppHeader />
      <main className={`${AppStyles.main}`}>
        <BurgerIngredients ingredients={ingredientsDATA} />
        <IngredientsContext.Provider value={ingredientsDATA}>
          <BurgerConstructor />
        </IngredientsContext.Provider>
      </main>
    </div>
  );
}

export default App;
