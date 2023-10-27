import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';

function NavLinkWithIcon({ to, icon: Icon, text, isActive }) {
  return (
    <NavLink to={to} className={`mt-4 mb-4 pt-4 pb-4 ${styles.header__element}`}>
      {isActive ? (
        <>
          <Icon type="primary" />
          <p className={`text text_type_main-default ml-2 mr-5 ${styles.navTextActive}`}>
            {text}
          </p>
        </>
      ) : (
        <>
          <Icon type="secondary" />
          <p className="text text_type_main-default ml-2 mr-5">{text}</p>
        </>
      )}
    </NavLink>
  );
}

function AppHeader() {
  const location = useLocation();

  const homeActive = location.pathname === '/';
  const feedActive = location.pathname.includes('/feed');
  const profileActive = location.pathname.includes('/profile');

  return (
    <header className={styles.header}>
      <nav className={styles.header__list}>
        <div className={styles.header__container}>
          <NavLinkWithIcon to="/" icon={BurgerIcon} text="Конструктор" isActive={homeActive} />
          <NavLinkWithIcon to="/feed" icon={ListIcon} text="Лента заказов" isActive={feedActive} />
        </div>
        
        <NavLink to="/" className={styles.header__logo}>
          <Logo />
        </NavLink>

        <NavLinkWithIcon to="/profile/user" icon={ProfileIcon} text="Личный кабинет" isActive={profileActive} />
    </nav>
    </header>
  );
}

export default AppHeader;
