import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";

import styles from "./profile-nav.module.css";

import { useDispatch } from "../../services/types/hooks";
import { logout } from "../../services/actions/auth";

const ProfileNav: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  // Обработчик выхода пользователя
  const onLogout = () => {
    dispatch(logout(localStorage.getItem("refreshToken")));
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.links}>
        <li>
          {/* Ссылка на профиль */}
          <NavLink
            to="/profile"
            end
            className={({ isActive }) =>
              `text text_type_main-medium + ${styles.link} + ${
                isActive ? styles.link_active : ""
              }`
            }
          >
            Профиль
          </NavLink>
        </li>
        <li>
          {/* Ссылка на историю заказов */}
          <NavLink
            to="/profile/orders"
            className={({ isActive }) =>
              `text text_type_main-medium + ${styles.link} + ${
                isActive ? styles.link_active : ""
              }`
            }
          >
            История заказов
          </NavLink>
        </li>
        <li>
          {/* Кнопка для выхода */}
          <button
            type={"button"}
            className={`text text_type_main-medium ${styles.button}`}
            onClick={onLogout}
          >
            Выход
          </button>
        </li>
      </ul>

      {/* Подпись к разделу в зависимости от текущего пути */}
      {location.pathname === "/profile" ? (
        <p className={`text text_type_main-default ${styles.caption}`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      ) : location.pathname === "/profile/orders" ? (
        <p className={`text text_type_main-default ${styles.caption}`}>
          В этом разделе вы можете просмотреть свою историю заказов
        </p>
      ) : (
        ""
      )}
    </nav>
  );
};

export default ProfileNav;
