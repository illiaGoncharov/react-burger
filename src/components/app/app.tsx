import { useEffect, FC } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { useDispatch } from "../../services/types/hooks";

import styles from "./app.module.css";

import AppHeader from "../app-header/app-header";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderInfoMain from "../order-info-main/order-info-main";
import Profile from "../profile/profile";
import Orders from "../orders/orders";
import Modal from "../modal/modal";

import {
  getIngredients,
  closeModalIngredientDetails,
} from "../../services/actions/ingredient";
import { checkUserAuth } from "../../services/actions/auth";

import HomePage from "../../pages/home-page/home-page";
import LoginPage from "../../pages/login-page/login-page";
import PasswordForgotPage from "../../pages/password-forgot-page/password-forgot-page";
import PasswordResetPage from "../../pages/password-reset-page/password-reset-page";
import ProfilePage from "../../pages/profile-page/profile-page";
import RegistrationPage from "../../pages/registration-page/registration-page";
import InfoIngredientPage from "../../pages/info-ingredient-page/info-ingredient-page";
import NotFound404 from "../../pages/not-found-page/not-found-page";
import OrderInfoPage from "../../pages/order-info-page/order-info-page";
import FeedPage from "../../pages/feed-page/feed-page";

import { OnlyAuth, OnlyUnAuth } from "../../pages/protected-route";

const App: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  const background = location.state && location.state.background;

  const closeModal = () => {
    navigate(-1);
    dispatch(closeModalIngredientDetails());
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <Routes location={background || location}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={<OnlyUnAuth component={<LoginPage />} />}
          />
          <Route
            path="/register"
            element={<OnlyUnAuth component={<RegistrationPage />} />}
          />
          <Route
            path="/profile"
            element={<OnlyAuth component={<ProfilePage />} />}
          >
            <Route index element={<OnlyAuth component={<Profile />} />} />
            <Route
              path="/profile/orders"
              element={<OnlyAuth component={<Orders />} />}
            />
          </Route>
          <Route
            path="/profile/orders/:id"
            element={<OnlyAuth component={<OrderInfoPage />} />}
          />
          <Route
            path="/forgot-password"
            element={<OnlyUnAuth component={<PasswordForgotPage />} />}
          />
          <Route
            path="/reset-password"
            element={<OnlyUnAuth component={<PasswordResetPage />} />}
          />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/feed/:id" element={<OrderInfoPage />} />
          <Route path="/ingredients/:id" element={<InfoIngredientPage />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </main>
      {background && (
        <Routes>
          <Route
            path="/profile/orders/:id"
            element={
              <Modal closeModal={closeModal}>
                <OrderInfoMain closeModal={closeModal} />
              </Modal>
            }
          />
          <Route
            path="/feed/:id"
            element={
              <Modal closeModal={closeModal}>
                <OrderInfoMain closeModal={closeModal} />
              </Modal>
            }
          />
          <Route
            path="/ingredients/:id"
            element={
              <Modal closeModal={closeModal}>
                <IngredientDetails closeModal={closeModal} />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
