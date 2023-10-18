import Header from "../../components/header/header";
import notFoundBurderImg from './../../images/not_found_burger.jpeg';


function NotFound404() {
    return (
    <>
        <Header />
        <h1 style={{ margin: "100px", textAlign: "center" }} className="text text_type_digits-medium"> Not Found 404 </h1>
        <img width="100%" height="500px" src={ notFoundBurderImg } alt="not found not_found (" />
    </>
    );
}

export default NotFound404;