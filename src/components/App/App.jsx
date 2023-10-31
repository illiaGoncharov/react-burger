import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import { getIngredients } from "../../services/actions/ingredientsActions";
import { getUserData } from "../../services/actions/userActions";

import {
  FeedPage,
  FeedOrderDetails,
  ProfileOrderDetails,
} from "../../pages";

import HomePage from "../../pages/HomePage/HomePage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import ForgotPasswordPage from "../../pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "../../pages/ResetPasswordPage/ResetPasswordPage";

import { ProfilePage } from "../../pages/ProfilePage/ProfilePage";
import { Profile } from "../../pages/ProfilePage/Profile/Profile";
import { Orders } from "../../pages/ProfilePage/Orders/Orders";

import styles from "./App.module.css";

import AppHeader from "../AppHeader/AppHeader";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

import { OnlyAuth, OnlyUnAuth } from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [wasOnForgotPassword, setWasOnForgotPassword] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const ingredientsRequest = useSelector((store) => store.ingredients.ingredientsRequest);

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      {ingredientsRequest ? (
        <h1>Загрузка данных</h1>
      ) : (
        <>
          <AppHeader />
          <main className={styles.main}>
            <Routes location={background || location}>

              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
              <Route path="/register" element={<OnlyUnAuth component={<RegisterPage />} />} />
              
              <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />}>
                <Route path="user" element={<OnlyAuth component={<Profile />} />}></Route>
                <Route path="orders" element={<OnlyAuth component={<Orders />} />}></Route>
              </Route>
              
              <Route
                path="/forgot-password"
                element={
                  <OnlyUnAuth
                    component={<ForgotPasswordPage />}
                    onEnter={() => setWasOnForgotPassword(true)}
                  />}
              />
              <Route
                path="/reset-password"
                element={
                  <OnlyUnAuth
                    component={<ResetPasswordPage />}
                    onEnter={() => {
                      if (!wasOnForgotPassword) {
                        // Редирект пользователя обратно на страницу forgot-password
                        navigate("/forgot-password");
                      }
                    }}
                  />
                }
              />
              
              <Route
                path="/profile/orders/:id"
                element={<OnlyAuth component={<ProfileOrderDetails />} />}
              ></Route>
              <Route path="/feed" element={<FeedPage />}></Route>
              <Route path="/feed/:id" element={<FeedOrderDetails />} />
              <Route path="/ingredients/:id" element={<IngredientDetails />}></Route>
            </Routes>
            
            {background && (
              <Routes>
                <Route
                  path="/ingredients/:id"
                  element={
                    <Modal
                      handlePopupClose={() => {
                        navigate(-1);
                      }}
                    >
                      <IngredientDetails />
                    </Modal>
                  }
                ></Route>
                <Route
                  path="/feed/:id"
                  element={
                    <Modal
                      handlePopupClose={() => {
                        navigate(-1);
                      }}
                    >
                      <FeedOrderDetails />
                    </Modal>
                  }
                ></Route>
                <Route
                  path="/profile/orders/:id"
                  element={
                    <OnlyAuth
                      component={
                        <Modal
                          handlePopupClose={() => {
                            navigate(-1);
                          }}
                        >
                          <ProfileOrderDetails />
                        </Modal>
                      }
                    />
                  }
                ></Route>
              </Routes>
            )}
          </main>
        </>
      )}
    </div>
  );
}

export default App;
