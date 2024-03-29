import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const Protected = ({ onlyUnAuth = false, component }) => {
    // isAuthChecked это флаг, показывающий что проверка токена произведена
    // при этом результат этой проверки не имеет значения, важно только,
    // что сам факт проверки имел место.
    const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
    const user = useSelector((store) => store.user.user);
    const location = useLocation();
    // console.log("Protected user", user, "onlyUnAuth", onlyUnAuth, "!user", !user);
    
    if (!isAuthChecked) {
        // Запрос еще выполняется
        // Выводим прелоадер в ПР
        // Здесь возвращается просто null для экономии времени
        return null;
    }

    if (onlyUnAuth && user) {
        // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
        // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
        const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to={from} />;
    }

    // console.log("PROTECTED !onlyUnAuth && !user", (!onlyUnAuth && !user))
    if (!onlyUnAuth && !user) {
        // console.log('Protected NOT OK!!!!!!!!!');
        return <Navigate to="/login" state={{ from: location }} />;
    }
    
    // console.log('Protected OK');
    // !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя
    
    return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }) => (
    <Protected onlyUnAuth={true} component={component} />
);
    