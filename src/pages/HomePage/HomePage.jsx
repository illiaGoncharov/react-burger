import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Modal from "../../components/Modal/Modal";
import OrderDetails from "../../components/OrderDetails/OrderDetails";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";

import styles from "./HomePage.module.css";

const HomePage = () => {
  const [orderDetalsPopupOpen, setOrderDetalsPopupOpen] = useState(false);
  const closeOrderPopup = () => {
    setOrderDetalsPopupOpen(false);
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.home__ingedients}>
          <BurgerIngredients />
        </div>
        <div>
          <BurgerConstructor handlePopupState={setOrderDetalsPopupOpen} />
        </div>
      </DndProvider>
      {orderDetalsPopupOpen && (
        <Modal handlePopupClose={closeOrderPopup}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

export default HomePage;
