import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyle from './header.module.css'
import { Link } from 'react-router-dom';


function Header() {
  return (
    <header className={ headerStyle.header }>
      <nav className={ headerStyle.navigation }>
        <div className={ headerStyle.navigation_left }>
          <Link to={ "/" } className={ headerStyle.link_constructor } >
            <BurgerIcon type="secondary" />
            <p>Конструктор</p>
          </Link>
          <Link to={ "/feed" } className={ headerStyle.link } >
            <ListIcon type="secondary" />
            <p>Лента заказов</p>
          </Link>
        </div>
        <Link to={ "/" } className={ headerStyle.link_constructor } >
          <Logo />
        </Link>
        <Link to={ "/profile" } className={ headerStyle.navigation_right } >
          <ProfileIcon type="secondary" />
          <p>Личный кабинет</p>
        </Link>
      </nav>
    </header>
  ) 
}

export default Header;