import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyles from './app-header.module.css'


function AppHeader() {
  return (
    <header className={appHeaderStyles.header}>
      <nav className={appHeaderStyles.navigation}>
        <div className={appHeaderStyles.navigation_left}>
          <a href='' className={appHeaderStyles.link_constructor}>
          <BurgerIcon type="primary" />
          <p>Конструктор</p>
          </a>
          <a href='' className={appHeaderStyles.link}>
          <ListIcon type="primary" />
          <p>Лента заказов</p>
          </a>
        </div>
        <Logo />
        <a href='' className={appHeaderStyles.navigation_right}>
        <ProfileIcon type="primary" />
        <p>Личный кабинет</p>
        </a>
      </nav>
    </header>
  ) 
}

export default AppHeader;