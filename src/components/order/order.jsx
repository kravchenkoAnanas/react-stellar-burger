import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import orderStyle from './order.module.css';
import { useSelector } from "react-redux";

const getIngredient = (ingredients, id) => {
  const filteredIngredient = ingredients.filter((ingredient) => {
    return ingredient._id === id
  });
  if (filteredIngredient.length) {
    return filteredIngredient[0];
  }
};

const getImages = (orderIngredients) => {
  const output = [];
  const maxElements = 6;

  for (let i = 0; i < maxElements; ++i) {
    let element;

    if (i < orderIngredients.length) {
      element = (
        <div
          className={ orderStyle.imageWrapper }
          style={{ zIndex: `${100 - i}` }}
          >
          {i !== maxElements - 1 &&
            <img
            src={ orderIngredients[i].image }
            className={ orderStyle.image }
            alt="order's ingredient image"
            />
          }
          {i === maxElements - 1 && orderIngredients.length - maxElements &&
          <>
            <img
              src={ orderIngredients[i].image }
              className={ orderStyle.image }
              alt="order's ingredient image"
              style={{ filter: "brightness(50%)" }}
              />
            <p
              className={ orderStyle.frontImgText }
            >
              +{orderIngredients.length - maxElements}
            </p>
          </>
          }
        </div>
      )
    } else {
      element = (
        <div className={ orderStyle.imageWrapperEmpty }/>
        )
      }
      output.push(element);
  }
  return output;
}

const totalSum = (ingredients) => {
  let sum = 0;
  ingredients.map(ingredient => { sum += ingredient.price });
  return sum;
}

function Order({ info, add_status }) {
  const { name, number, createdAt } = info;
  const orderIngredientsIdxs = info.ingredients;
  const formattedDate = new Date(createdAt);
  const { ingredients } = useSelector(state => state.ingredients);
  const orderIngredients = orderIngredientsIdxs.map((id) => getIngredient(ingredients, id));
  const price = totalSum(orderIngredients);

  let status = 'Выполнен';
  let statusStyle = '';
  if (info.status === 'pending') {
    status = "Готовится"
    statusStyle = orderStyle.status_pending;
  } else if (info.status === 'cancel') {
    status = "Отменен"
    statusStyle = orderStyle.status_canceled;
  }

  console.log("ingredients", ingredients.length, ingredients[0]);
  console.log("orderIngredients", orderIngredients.length, orderIngredients[0]);

  return (
    <>
      <div className={ orderStyle.info }>
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

Order.propTypes = {
}
export default Order;