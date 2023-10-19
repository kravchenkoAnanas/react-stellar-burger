import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import feedStyle from './feed.module.css'

function FeedPage() {
  const today = new Date();

    return (
      <>
      <div className={ feedStyle.feed }>
        <div className={ feedStyle.feed_left }>
          <h2 className="text text_type_main-large mt-10">Лента заказов</h2>
          <div>
            <div className={ feedStyle.info }>
              <div className={ feedStyle.digits }>
                <p className="text text_type_digits-default">#03456</p>
                <FormattedDate
                  date={
                    new Date(
                      today.getFullYear(),
                      today.getMonth(),
                      today.getDate(),
                      today.getHours(),
                      today.getMinutes() - 1,
                      0,
                    )
                  }
                  className="text text_type_main-default text_color_inactive"
                />
              </div>
              <p className="text text_type_main-medium">Death Star Starship Main бургер</p>
              <div>
                <img></img>
                <div className={ feedStyle.sum }>
                  <p className="text text_type_digits-default">480</p>
                  <CurrencyIcon type="primary"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={ feedStyle.feed_right }>
          <div className={ feedStyle.order_numbers }>
            <div>
            <p className="text text_type_main-medium">Готовы:</p>
            <div className={ feedStyle.order_numbers_left }>
              <p className="text text_type_digits-default">056789</p>
              <p className="text text_type_digits-default">056788</p>
              <p className="text text_type_digits-default">056787</p>
              <p className="text text_type_digits-default">056786</p>
              <p className="text text_type_digits-default">056785</p>
            </div>
            </div>
            <div>
            <p className="text text_type_main-medium">В работе:</p>
            <div className={ feedStyle.order_numbers_right }>
              <p className="text text_type_digits-default">056789</p>
              <p className="text text_type_digits-default">056788</p>
              <p className="text text_type_digits-default">056787</p>
            </div>
            </div>
          </div>
          <div>
            <p className="text text_type_main-medium">Выполнено за все время:</p>
            <p className={`${ feedStyle.numbers } text text_type_digits-large`}>29 756</p>
          </div>
          <div>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p className={`${ feedStyle.numbers } text text_type_digits-large`}>140</p>
          </div>
        </div>
      </div>
      </>
    );
  }
  
  export default FeedPage;