import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../services/actions/userActions";
import { getUserData } from "../../services/actions/userActions";

import styles from "./ProfilePage.module.css";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const logOut = () => {
    dispatch(logOutUser());
  };

  const navLinks = [
    { 
      to: "/profile/user", 
      text: "Профиль", 
      description: "В этом разделе вы можете изменить свои персональные данные" 
    },
    { 
      to: "/profile/orders", 
      text: "История заказов", 
      description: "В этом разделе вы можете просмотреть свою историю заказов" 
},
    { 
      to: "/", 
      text: "Выход", 
      onClick: logOut 
    },
  ];
  
  return (
    <div className={styles.pp__container}>
      <nav className={`mr-20 ${styles.pp__navLinks}`}>
        {navLinks.map((navLink, index) => (
          <NavLink
            key={index}
            to={navLink.to}
            className={({ isActive, isPending }) =>
              isPending ? styles.pp__navLink : isActive ? styles.pp__navActiveLinks : styles.pp__navLink
            }
            onClick={navLink.onClick}
          >
            {navLink.text}
          </NavLink>
        ))}
        {location.pathname === "/profile/user" && (
          <p className="text text_type_main-default text_color_inactive mt-20">
            {navLinks[0].description}
          </p>
        )}
        {location.pathname === "/profile/orders" && (
          <p className="text text_type_main-default text_color_inactive mt-20">
            {navLinks[1].description}
          </p>
        )}
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
