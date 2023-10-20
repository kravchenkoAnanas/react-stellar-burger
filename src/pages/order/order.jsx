import { useParams } from 'react-router-dom';
import orderStyle from './order.module.css'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

function OrderPage() {
  const { id } = useParams();
  const today = new Date()
  const yesterday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 1,
    today.getHours(),
    today.getMinutes() - 1,
    0,
  )

  return (
    <>
      <div className={ orderStyle.order }>
        <div className={ orderStyle.info }>
          <p className={`${ orderStyle.number } text text_type_digits-default mb-10`}>#12345</p> 
          <p className="text text_type_main-medium mb-3">Black Hole Singularity острый бургер</p>
          <p className={`${ orderStyle.ready } text text_type_main-small mb-15`}>Выполнен</p>
          <p className="text text_type_main-medium mb-6">Состав:</p>
        </div>
        <div className={ orderStyle.consist }>
          <div className={ orderStyle.ingredient }>
            <div className={ orderStyle.left }>
              <img width={ 64 } height={ 64 }></img>
              <p className={`${ orderStyle.text } text text_type_main-small`}>Флюоресцентная булка R2-D3</p>
            </div>
            <div className={ orderStyle.sum }>
              <p className="text text_type_digits-default">2 x 20</p>
              <CurrencyIcon type="primary"/>
            </div>
          </div>
          <div className={ orderStyle.ingredient }>
            <div className={ orderStyle.left }>
              <img width={ 64 } height={ 64 }></img>
              <p className={`${ orderStyle.text } text text_type_main-small`}>Филе Люминесцентного тетраодонтимформа</p>
            </div>
            <div className={ orderStyle.sum }>
              <p className="text text_type_digits-default">1 x 300</p>
              <CurrencyIcon type="primary"/>
            </div>
          </div>
          <div className={ orderStyle.ingredient }>
            <div className={ orderStyle.left }>
              <img width={ 64 } height={ 64 }></img>
              <p className={`${ orderStyle.text } text text_type_main-small`}>Соус традиционный галактический</p>
            </div>
            <div className={ orderStyle.sum }>
              <p className="text text_type_digits-default">1 x 30</p>
              <CurrencyIcon type="primary"/>
            </div>
          </div>
          <div className={ orderStyle.ingredient }>
            <div className={ orderStyle.left }>
              <img width={ 64 } height={ 64 }></img>
              <p className={`${ orderStyle.text } text text_type_main-small`}>Плоды фалленианского дерева</p>
            </div>
            <div className={ orderStyle.sum }>
              <p className="text text_type_digits-default">1 x 80</p>
              <CurrencyIcon type="primary"/>
            </div>
          </div>
        </div>
        <div className={ orderStyle.total }>
          <FormattedDate date={yesterday} className="text text_type_main-default text_color_inactive" />
          <div className={ orderStyle.sum }>
            <p className="text text_type_digits-default">510</p>
            <CurrencyIcon type="primary"/>
          </div>
        </div>

      </div>
    
    </>
  );
}

export default OrderPage;
