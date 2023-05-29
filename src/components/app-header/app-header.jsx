import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyle from './app-header.module.css'


function AppHeader() {
  return (
    <header className={ appHeaderStyle.header }>
      <nav className={ appHeaderStyle.navigation }>
        <div className={ appHeaderStyle.navigation_left }>
          <a href='#' className={ appHeaderStyle.link_constructor }>
          <BurgerIcon type="primary" />
          <p>Конструктор</p>
          </a>
          <a href='#' className={ appHeaderStyle.link }>
          <ListIcon type="secondary" />
          <p>Лента заказов</p>
          </a>
        </div>
        <Logo />
        <a href='#' className={ appHeaderStyle.navigation_right }>
        <ProfileIcon type="secondary" />
        <p>Личный кабинет</p>
        </a>
      </nav>
    </header>
  ) 
}

export default AppHeader;