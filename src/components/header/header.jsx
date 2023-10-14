import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyle from './header.module.css'


function Header() {
  return (
    <header className={ headerStyle.header }>
      <nav className={ headerStyle.navigation }>
        <div className={ headerStyle.navigation_left }>
          <a href='#' className={ headerStyle.link_constructor }>
            <BurgerIcon type="primary" />
            <p>Конструктор</p>
          </a>
          <a href='#' className={ headerStyle.link }>
            <ListIcon type="secondary" />
            <p>Лента заказов</p>
          </a>
        </div>
        <Logo />
        <a href='/profile' className={ headerStyle.navigation_right }>
          <ProfileIcon type="secondary" />
          <p>Личный кабинет</p>
        </a>
      </nav>
    </header>
  ) 
}

export default Header;