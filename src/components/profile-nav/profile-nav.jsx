import { Link } from 'react-router-dom';
import profileNavStyle from './profile-nav.module.css';
import { useDispatch } from 'react-redux';
import { logoutUserAction } from '../../services/actions/user';

function ProfileNav() {
  const dispatch = useDispatch();

  const submitExit = () => {
    dispatch(logoutUserAction());
  };

  return (
    <div className={ profileNavStyle.block }>
      <div className={ profileNavStyle.nav }>
          <p className="text text_type_main-medium">
              Профиль
          </p>
          <Link to={ "/profile/orders" } className={ profileNavStyle.link } >
              <p className="text text_type_main-medium text_color_inactive">
                  История заказов
              </p>
          </Link>
          <Link onClick={ submitExit } className={ profileNavStyle.link } >
              <p className="text text_type_main-medium text_color_inactive">
                  Выход
              </p>
          </Link>
      </div>
      <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
  ) 
}

export default ProfileNav;