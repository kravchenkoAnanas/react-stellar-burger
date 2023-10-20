import notFoundBurderImg from './../../images/not_found_burger.jpeg';
import notFoundStyle from './not_found.module.css';


function NotFound404() {
    return (
    <>
        <h1 className={`${ notFoundStyle.not_found } text text_type_digits-medium`}> Not Found 404 </h1>
        <img width="100%" height="500px" src={ notFoundBurderImg } alt="not found not_found (" />
    </>
    );
}

export default NotFound404;