import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import orderStyle from './order.module.css';
// import { useSelector } from "react-redux";
import { useSelector, useDispatch } from './../../services/hooks';
import { getIngredient, getStatus, totalSum } from "../../utils/data";
import { FC } from "react";

interface OrderProps {
  info: any;
  add_status: any;
}

const Order: FC<OrderProps> = ({ info, add_status }) => {
  const { name, number, createdAt } = info;
  const orderIngredientsIdxs = info.ingredients;
  const formattedDate = new Date(createdAt);
  const { ingredients } = useSelector((state: any) => state.ingredients);
  const orderIngredients = orderIngredientsIdxs.map((id: any) => getIngredient(ingredients, id));
  const price = totalSum(orderIngredients);
  const [status, statusStyle] = getStatus(info.status);
  
  // console.log("ingredients", ingredients.length, ingredients[0]);
  // console.log("orderIngredients", orderIngredients.length, orderIngredients[0]);

  const getImages = (orderIngredients: any) => {
    const output = [];
    const maxElements = 6;
  
    for (let i: any = 0; i < maxElements; ++i) {
      let element;
  
      if (i < orderIngredients.length) {
        element = (
          <div
            className={ orderStyle.imageWrapper }
            style={{ zIndex: `${100 - i}` }}
            key={ i }
           >
            {i !== maxElements - 1 &&
              <img
              src={ orderIngredients[i].image }
              className={ orderStyle.image }
              alt="order's ingredient image"
              key={ i }
              />
            }
            {i === maxElements - 1 && orderIngredients.length - maxElements &&
            <>
              <img
                src={ orderIngredients[i].image }
                className={ orderStyle.image }
                alt="order's ingredient image"
                style={{ filter: "brightness(50%)" }}
                key={ i + 1}
                />
              <p
                className={ orderStyle.frontImgText }
                key={ i + 2 }
              >
                +{orderIngredients.length - maxElements}
              </p>
            </>
            }
          </div>
        )
      } else {
        element = (
          <div
           className={ orderStyle.imageWrapperEmpty }
           key={ i }
           />
          )
        }
       output.push(element);
    }
    return output;
 };

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