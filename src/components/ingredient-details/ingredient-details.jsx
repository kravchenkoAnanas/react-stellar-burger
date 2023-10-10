import ingredientDetailsStyle from './ingredient-details.module.css'
import { useSelector } from 'react-redux';

function IngredientDetails() {
  const { ingredientInfo } = useSelector(state => state.ingredientVisible);
  const { name, image, calories, proteins, fat, carbohydrates } = ingredientInfo;

  return (
    <div>
      <h2 className="text text_type_main-large mt-10 mr-25 ml-10">Детали ингридиента</h2>
      <div className={ ingredientDetailsStyle.content }>
        <img className={ ingredientDetailsStyle.image } src={ image } alt={ name } />
        <h3 className="text text_type_main-small mt-4 mb-8">{ name }</h3>
        <div className={`${ ingredientDetailsStyle.nutrients } mb-4`}>
          <div className="text text_type_main-default text_color_inactive">
            <p>Калории,ккал</p>
            <p className={`${ ingredientDetailsStyle.number } text text_type_digits-default`}>{ calories }</p>
          </div>
          <div className="text text_type_main-default text_color_inactive">
            <p>Белки, г</p>
            <p className={`${ ingredientDetailsStyle.number } text text_type_digits-default`}>{ proteins }</p>
          </div>
          <div className="text text_type_main-default text_color_inactive">
            <p>Жиры, г</p>
            <p className={`${ ingredientDetailsStyle.number } text text_type_digits-default`}>{ fat }</p>
          </div>
          <div className="text text_type_main-default text_color_inactive">
            <p>Углеводы, г</p>
            <p className={`${ ingredientDetailsStyle.number } text text_type_digits-default`}>{ carbohydrates }</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default IngredientDetails;