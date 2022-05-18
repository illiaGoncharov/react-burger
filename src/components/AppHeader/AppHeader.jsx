import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import AppHeaderCSS from './AppHeader.module.css';

function AppHeader() {
  return (
    <>
      <header className={`${AppHeaderCSS.header} pt-4 pb-4`}>
        <nav className={AppHeaderCSS.header__nav}>
          <ul className={AppHeaderCSS.list}>
            <li className={AppHeaderCSS.list__item}>
              <a href="" className={AppHeaderCSS.list__anchor}>
                <BurgerIcon type="primary" />
                <span className={`${AppHeaderCSS.list__title} ml-2 text text_type_main-default`}>Конструктор</span>
              </a>
            </li>
            <li className={AppHeaderCSS.list__item}>
              <a href="" className={AppHeaderCSS.list__anchor}>
                <ListIcon type="secondary" />
                <span className={`${AppHeaderCSS.list__title} ml-2 text text_type_main-default text_color_inactive`}>Лента заказов</span>
              </a>
            </li>
          </ul>

          <a className={AppHeaderCSS.logo} href="#">
            <Logo />
          </a>
            
          <a href="" className={AppHeaderCSS.login__anchor}>
            <ProfileIcon type="secondary" />
            <span className={`${AppHeaderCSS.list__title} ml-2 text text_type_main-default text_color_inactive`}>Личный кабинет</span>
          </a>
        </nav>
      </header>
      
    </>
  );
}

export default AppHeader;