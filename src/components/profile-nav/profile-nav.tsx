import { Link } from 'react-router-dom';
import profileNavStyle from './profile-nav.module.css';
import { useDispatch } from 'react-redux';
import { logoutUserAction } from '../../services/actions/user';
import { WS_CONNECTION_CLOSE } from '../../services/actions/wsActions';
import { FC } from 'react';

interface ProfileNavProps {
  type: any;
}

const ProfileNav: FC<ProfileNavProps> = ({ type }) => {
  const dispatch = useDispatch();

  const submitExit = () => {
    dispatch(logoutUserAction());
    dispatch({
      type: WS_CONNECTION_CLOSE,
    });
  };

  const baseNavTetxStyle = "text text_type_main-medium";
  const profileStyle = baseNavTetxStyle + (type === "profile" ? "" : " text_color_inactive");
  const ordersStyle = baseNavTetxStyle + (type === "orders" ? "" : " text_color_inactive");

  return (
    <div className={ profileNavStyle.block }>
      <div className={ profileNavStyle.nav }>
          <Link to={ "/profile" } className={ profileNavStyle.link } >
            <p className={ profileStyle }>
                Профиль
            </p>
          </Link>
          <Link to={ "/profile/orders" } className={ profileNavStyle.link } >
              <p className={ ordersStyle }>
                  История заказов
              </p>
          </Link>
          <Link to={ "/" } onClick={ submitExit } className={ profileNavStyle.link } >
              <p className={ baseNavTetxStyle + " text_color_inactive" }>
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