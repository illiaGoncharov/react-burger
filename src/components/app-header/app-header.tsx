import { FC } from "react";
import { NavLink } from "react-router-dom";

import {
  Logo,
  ListIcon,
  ProfileIcon,
  BurgerIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./app-header.module.css";

const AppHeader: FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.nav_items}>
          <li>
            <NavLink to={"/"} className={styles.item}>
              {({ isActive }) => (
                <>
                  <div className={styles.icon}>
                    <BurgerIcon type={isActive ? "primary" : "secondary"} />
                  </div>
                  <div
                    className={`text text_type_main-default + ${
                      isActive ? styles.active : styles.noActive
                    }`}
                  >
                    Конструктор
                  </div>
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to={"/feed"} className={styles.item}>
              {({ isActive }) => (
                <>
                  <div className={styles.icon}>
                    <ListIcon type={isActive ? "primary" : "secondary"} />
                  </div>
                  <div
                    className={`text text_type_main-default + ${
                      isActive ? styles.active : styles.noActive
                    }`}
                  >
                    Лента заказов
                  </div>
                </>
              )}
            </NavLink>
          </li>
        </ul>
        <NavLink to={"/"} className={styles.logo}>
          <Logo />
        </NavLink>
        <div>
          <NavLink to="/profile" className={styles.itemToRight}>
            {({ isActive }) => (
              <>
                <div className={styles.icon}>
                  <ProfileIcon type={isActive ? "primary" : "secondary"} />
                </div>
                <div
                  className={`text text_type_main-default + ${
                    isActive ? styles.active : styles.noActive
                  }`}
                >
                  Личный кабинет
                </div>
              </>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
