import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import orderStyle from './order.module.css';
import { useSelector } from "react-redux";
import { getIngredient, getStatus, getImages, totalSum } from "../../utils/data";


function Order({ info, add_status }) {
  const { name, number, createdAt } = info;
  const orderIngredientsIdxs = info.ingredients;
  const formattedDate = new Date(createdAt);
  const { ingredients } = useSelector(state => state.ingredients);
  const orderIngredients = orderIngredientsIdxs.map((id) => getIngredient(ingredients, id));
  const price = totalSum(orderIngredients);
  const [status, statusStyle] = getStatus(info.status);
  
  // console.log("ingredients", ingredients.length, ingredients[0]);
  // console.log("orderIngredients", orderIngredients.length, orderIngredients[0]);

  return (
    <>
      <div className={ orderStyle.info } key={ info._id } >
        <div className={ orderStyle.digits }>
          <p className="text text_type_digits-default">#{ number }</p>
          <FormattedDate
            date={ formattedDate}
            className="text text_type_main-default text_color_inactive"
          />
        </div>
        <p className="text text_type_main-medium">{ name }</p>
        {add_status &&
          <p className={`${ statusStyle } text text_type_main-default mb-6 mt-2`}>
          { status }
        </p>
        }
        <div className={ orderStyle.total }>
          <div className={ orderStyle.images }> {
            getImages(orderIngredients)
          }
          </div>
          <div className={ orderStyle.price }>
            <p className="text text_type_digits-default">{ price }</p>
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;